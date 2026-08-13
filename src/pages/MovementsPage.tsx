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
import { formatAmount, formatDate, toApiAmount, toApiDate, toInputDate, toLocalIsoDate } from '@/utils/format';
import styles from './Page.module.css';

type MovementTypeFilter = '' | MovementTypeV1;

type MovementFormState = {
  movementType: MovementTypeV1;
  categoryId: string;
  amount: string;
  description: string;
  expenseDate: string;
  offsetsSpendingAverage: boolean;
  reimbursedExpenseId: string;
};

const emptyForm = (): MovementFormState => ({
  movementType: 'EXPENSE',
  categoryId: '',
  amount: '',
  description: '',
  expenseDate: todayIsoDate(),
  offsetsSpendingAverage: false,
  reimbursedExpenseId: '',
});

function movementTypeLabel(movementType: MovementTypeV1 | undefined): string {
  return movementType === 'INCOME' ? 'Ingreso' : 'Gasto';
}

function expenseDateKey(expenseDate: string | Date | undefined): string {
  if (!expenseDate) {
    return '';
  }
  return expenseDate instanceof Date ? toLocalIsoDate(expenseDate) : expenseDate.slice(0, 10);
}

function expenseLinkLabel(expense: ExpenseV1): string {
  const date = formatDate(expense.expenseDate);
  const amount = formatAmount(expense.amount);
  const description = expense.description?.trim() || 'Sin descripción';
  return `${date} · ${description} · ${amount}`;
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
  const { data: linkableExpensesData } = useExpenses({ movementType: 'EXPENSE' });
  const createMovement = useCreateExpense();
  const updateMovement = useUpdateExpense();
  const deleteMovement = useDeleteExpense();
  const { errorMessage, isGuide, showError, clearError } = useErrorDialog();

  const allCategories = allCategoriesData?.categories ?? [];
  const filterCategories = filterCategoriesData?.categories ?? [];
  const formCategories = formCategoriesData?.categories ?? [];
  const categoryMap = new Map(allCategories.map((category) => [category.id, category]));
  const movements = data?.expenses ?? [];
  const linkableExpenses = (linkableExpensesData?.expenses ?? [])
    .filter((expense) => expense.id != null && expense.id !== editing?.id)
    .slice()
    .sort((expenseA, expenseB) => {
      const dateCompare = expenseDateKey(expenseB.expenseDate).localeCompare(
        expenseDateKey(expenseA.expenseDate),
      );
      if (dateCompare !== 0) {
        return dateCompare;
      }
      return (expenseB.id ?? 0) - (expenseA.id ?? 0);
    });

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
      reimbursedExpenseId:
        movement.movementType === 'INCOME' && movement.reimbursedExpenseId != null
          ? String(movement.reimbursedExpenseId)
          : '',
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
      reimbursedExpenseId: '',
    });
  };

  const handleReimbursedExpenseChange = (value: string) => {
    setForm({ ...form, reimbursedExpenseId: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reimbursedExpenseId =
      form.movementType === 'INCOME' && form.reimbursedExpenseId
        ? Number(form.reimbursedExpenseId)
        : null;
    const offsetsSpendingAverage =
      form.movementType === 'INCOME' ? reimbursedExpenseId != null : form.offsetsSpendingAverage;
    try {
      if (editing?.id) {
        const body: PatchExpenseV1Request = {
          categoryId: Number(form.categoryId),
          amount: toApiAmount(form.amount),
          description: form.description,
          expenseDate: toApiDate(form.expenseDate),
          movementType: form.movementType,
          offsetsSpendingAverage,
          reimbursedExpenseId,
        };
        await updateMovement.mutateAsync({ id: editing.id, body });
      } else {
        const body: PostExpenseV1Request = {
          categoryId: Number(form.categoryId),
          amount: toApiAmount(form.amount),
          description: form.description,
          expenseDate: toApiDate(form.expenseDate),
          movementType: form.movementType,
          offsetsSpendingAverage,
          ...(reimbursedExpenseId != null ? { reimbursedExpenseId } : {}),
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
            <Field label="Gasto reembolsado">
              <Select value={form.reimbursedExpenseId} onChange={(e) => handleReimbursedExpenseChange(e.target.value)}>
                <option value="">Ninguno</option>
                {linkableExpenses.map((expense) => (
                  <option key={expense.id} value={expense.id}>
                    {expenseLinkLabel(expense)}
                  </option>
                ))}
              </Select>
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
