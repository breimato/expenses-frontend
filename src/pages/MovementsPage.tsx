import { type FormEvent, useMemo, useState } from 'react';
import type { ExpenseV1, MovementTypeV1, PatchExpenseV1Request, PostExpenseV1Request } from '@/api/generated';
import { todayIsoDate } from '@/api/client';
import { Amount } from '@/components/ui/Amount';
import { Button } from '@/components/ui/Button';
import { CategoryLabel } from '@/components/ui/CategoryStripe';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { DataTable } from '@/components/ui/DataTable';
import { ErrorDialog } from '@/components/ui/ErrorDialog';
import { AmountInput, Field, Input, Select } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { StateMessage } from '@/components/ui/StateMessage';
import { useCategories } from '@/hooks/useCategories';
import { useErrorDialog } from '@/hooks/useErrorDialog';
import {
  useCreateExpense,
  useDeleteExpense,
  useExpenses,
  useUpdateExpense,
} from '@/hooks/useExpenses';
import { formatDate, toApiAmount, toApiDate, toInputDate } from '@/utils/format';
import styles from './Page.module.css';

type MovementTypeFilter = '' | MovementTypeV1;

type MovementFormState = {
  movementType: MovementTypeV1;
  categoryId: string;
  amount: string;
  description: string;
  expenseDate: string;
  offsetsSpendingAverage: boolean;
};

const emptyForm = (): MovementFormState => ({
  movementType: 'EXPENSE',
  categoryId: '',
  amount: '',
  description: '',
  expenseDate: todayIsoDate(),
  offsetsSpendingAverage: false,
});

function movementTypeLabel(movementType: MovementTypeV1 | undefined): string {
  return movementType === 'INCOME' ? 'Ingreso' : 'Gasto';
}

export function MovementsPage() {
  const [typeFilter, setTypeFilter] = useState<MovementTypeFilter>('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [editing, setEditing] = useState<ExpenseV1 | null>(null);
  const [form, setForm] = useState<MovementFormState>(emptyForm);

  const filters = useMemo(
    () => ({
      movementType: typeFilter || undefined,
      categoryId: typeFilter && categoryFilter ? Number(categoryFilter) : undefined,
      expenseDate: dateFilter ? toApiDate(dateFilter) : undefined,
      description: descriptionFilter || undefined,
    }),
    [typeFilter, categoryFilter, dateFilter, descriptionFilter],
  );

  const { data: allCategoriesData } = useCategories();
  const { data: filterCategoriesData } = useCategories(
    typeFilter ? { movementType: typeFilter } : undefined,
  );
  const { data: formCategoriesData } = useCategories({ movementType: form.movementType });
  const { data, isLoading, isError } = useExpenses(filters);
  const createMovement = useCreateExpense();
  const updateMovement = useUpdateExpense();
  const deleteMovement = useDeleteExpense();
  const { errorMessage, isGuide, showError, clearError } = useErrorDialog();

  const allCategories = allCategoriesData?.categories ?? [];
  const filterCategories = filterCategoriesData?.categories ?? [];
  const formCategories = formCategoriesData?.categories ?? [];
  const categoryMap = new Map(allCategories.map((category) => [category.id, category]));
  const movements = data?.expenses ?? [];

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value as MovementTypeFilter);
    setCategoryFilter('');
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (movement: ExpenseV1) => {
    setEditing(movement);
    setForm({
      movementType: (movement.movementType as MovementTypeV1) ?? 'EXPENSE',
      categoryId: String(movement.categoryId ?? ''),
      amount: movement.amount ?? '',
      description: movement.description ?? '',
      expenseDate: toInputDate(movement.expenseDate),
      offsetsSpendingAverage: movement.offsetsSpendingAverage ?? false,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleFormMovementTypeChange = (value: string) => {
    setForm({
      ...form,
      movementType: value as MovementTypeV1,
      categoryId: '',
      offsetsSpendingAverage: false,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (editing?.id) {
        const body: PatchExpenseV1Request = {
          categoryId: Number(form.categoryId),
          amount: toApiAmount(form.amount),
          description: form.description,
          expenseDate: toApiDate(form.expenseDate),
          movementType: form.movementType,
          offsetsSpendingAverage: form.offsetsSpendingAverage,
        };
        await updateMovement.mutateAsync({ id: editing.id, body });
      } else {
        const body: PostExpenseV1Request = {
          categoryId: Number(form.categoryId),
          amount: toApiAmount(form.amount),
          description: form.description,
          expenseDate: toApiDate(form.expenseDate),
          movementType: form.movementType,
          offsetsSpendingAverage: form.offsetsSpendingAverage,
        };
        await createMovement.mutateAsync(body);
      }
      closeModal();
    } catch (error) {
      await showError(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) {
      return;
    }
    try {
      await deleteMovement.mutateAsync(deleteTargetId);
      setDeleteTargetId(null);
    } catch (error) {
      await showError(error);
    }
  };

  const isSubmitting = createMovement.isPending || updateMovement.isPending;
  const isDeleting = deleteMovement.isPending;

  return (
    <div className={styles.page}>
      <div className={styles.headerPrimary}>
        <div>
          <h1>Movimientos</h1>
          <p className={styles.lead}>Gastos e ingresos</p>
        </div>
        <Button variant="primary" onClick={openCreate}>
          Nuevo movimiento
        </Button>
      </div>

      <div className={styles.filters}>
        <Field label="Tipo">
          <Select value={typeFilter} onChange={(e) => handleTypeFilterChange(e.target.value)}>
            <option value="">Todos</option>
            <option value="EXPENSE">Gasto</option>
            <option value="INCOME">Ingreso</option>
          </Select>
        </Field>
        {typeFilter && (
          <Field label="Categoría">
            <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">Todas</option>
              {filterCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </Field>
        )}
        <Field label="Fecha">
          <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        </Field>
        <Field label="Buscar">
          <Input
            value={descriptionFilter}
            onChange={(e) => setDescriptionFilter(e.target.value)}
            placeholder="Descripción…"
          />
        </Field>
      </div>

      {isLoading && <StateMessage message="Cargando movimientos…" />}
      {isError && <StateMessage message="Error al cargar movimientos" variant="error" />}
      {!isLoading && !isError && (
        <DataTable
          headers={['Fecha', 'Tipo', 'Concepto', 'Categoría', 'Media', 'Importe', '']}
          alignRight={[5]}
          hideOnMobile={[4]}
          isEmpty={movements.length === 0}
          emptyMessage="No hay movimientos con estos filtros"
        >
          {movements.map((movement) => {
            const category = movement.categoryId ? categoryMap.get(movement.categoryId) : undefined;
            return (
              <tr key={movement.id}>
                <td>{formatDate(movement.expenseDate)}</td>
                <td>{movementTypeLabel(movement.movementType as MovementTypeV1 | undefined)}</td>
                <td>{movement.description}</td>
                <td>
                  <CategoryLabel color={category?.color} icon={category?.icon} name={category?.name} />
                </td>
                <td>{movement.offsetsSpendingAverage ? 'Sí' : 'No'}</td>
                <td style={{ textAlign: 'right' }}>
                  <Amount value={movement.amount} />
                </td>
                <td>
                  <div className={styles.rowActions}>
                    <Button size="small" onClick={() => openEdit(movement)}>
                      Editar
                    </Button>
                    {movement.id && (
                      <Button size="small" variant="danger" onClick={() => setDeleteTargetId(movement.id!)}>
                        Borrar
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </DataTable>
      )}

      {modalOpen && (
        <Modal
          title={editing ? 'Editar movimiento' : 'Nuevo movimiento'}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        >
          <Field label="Tipo">
            <Select required value={form.movementType} onChange={(e) => handleFormMovementTypeChange(e.target.value)}>
              <option value="EXPENSE">Gasto</option>
              <option value="INCOME">Ingreso</option>
            </Select>
          </Field>
          <Field label="Categoría">
            <Select
              required
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            >
              <option value="">Seleccionar…</option>
              {formCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Importe">
            <AmountInput
              required
              value={form.amount}
              onChange={(amount) => setForm({ ...form, amount })}
            />
          </Field>
          <Field label="Descripción">
            <Input
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>
          <Field label="Fecha">
            <Input
              required
              type="date"
              value={form.expenseDate}
              onChange={(e) => setForm({ ...form, expenseDate: e.target.value })}
            />
          </Field>
          {form.movementType === 'INCOME' ? (
            <Field label="Compensa en la media de gastos">
              <label className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={form.offsetsSpendingAverage}
                  onChange={(e) => setForm({ ...form, offsetsSpendingAverage: e.target.checked })}
                />
                <span>Para bizums o reembolsos de gastos que pagaste tú</span>
              </label>
            </Field>
          ) : (
            <Field label="Excluir de la media de gastos">
              <label className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={form.offsetsSpendingAverage}
                  onChange={(e) => setForm({ ...form, offsetsSpendingAverage: e.target.checked })}
                />
                <span>Para gastos que no quieras contar en la media de consumo diaria</span>
              </label>
            </Field>
          )}
        </Modal>
      )}

      <ConfirmDialog
        open={deleteTargetId !== null}
        title="Eliminar movimiento"
        message="¿Seguro que quieres eliminar este movimiento? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTargetId(null)}
      />

      <ErrorDialog
        open={errorMessage !== null}
        message={errorMessage ?? ''}
        isGuide={isGuide}
        onClose={clearError}
      />
    </div>
  );
}
