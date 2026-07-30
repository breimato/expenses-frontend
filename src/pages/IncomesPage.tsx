import { type FormEvent, useMemo, useState } from 'react';
import type { ExpenseV1, MovementTypeV1, PatchExpenseV1Request, PostExpenseV1Request } from '@/api/generated';
import { todayIsoDate } from '@/api/client';
import { Amount } from '@/components/ui/Amount';
import { Button } from '@/components/ui/Button';
import { CategoryStripe } from '@/components/ui/CategoryStripe';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { DataTable } from '@/components/ui/DataTable';
import { ErrorDialog } from '@/components/ui/ErrorDialog';
import { Field, Input, Select } from '@/components/ui/Input';
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
import { formatDate, toApiDate, toInputDate } from '@/utils/format';
import styles from './Page.module.css';

type IncomeFormState = {
  categoryId: string;
  amount: string;
  description: string;
  expenseDate: string;
  offsetsSpendingAverage: boolean;
};

const emptyForm = (): IncomeFormState => ({
  categoryId: '',
  amount: '',
  description: '',
  expenseDate: todayIsoDate(),
  offsetsSpendingAverage: false,
});

export function IncomesPage() {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [editing, setEditing] = useState<ExpenseV1 | null>(null);
  const [form, setForm] = useState<IncomeFormState>(emptyForm);

  const filters = useMemo(
    () => ({
      movementType: 'INCOME' as MovementTypeV1,
      categoryId: categoryFilter ? Number(categoryFilter) : undefined,
      expenseDate: dateFilter ? toApiDate(dateFilter) : undefined,
      description: descriptionFilter || undefined,
    }),
    [categoryFilter, dateFilter, descriptionFilter],
  );

  const { data: categoriesData } = useCategories({ movementType: 'INCOME' });
  const { data, isLoading, isError } = useExpenses(filters);
  const createIncome = useCreateExpense();
  const updateIncome = useUpdateExpense();
  const deleteIncome = useDeleteExpense();
  const { errorMessage, isGuide, showError, clearError } = useErrorDialog();

  const categories = categoriesData?.categories ?? [];
  const categoryMap = new Map(categories.map((c) => [c.id, c]));
  const incomes = data?.expenses ?? [];

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (income: ExpenseV1) => {
    setEditing(income);
    setForm({
      categoryId: String(income.categoryId ?? ''),
      amount: income.amount ?? '',
      description: income.description ?? '',
      expenseDate: toInputDate(income.expenseDate),
      offsetsSpendingAverage: income.offsetsSpendingAverage ?? false,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (editing?.id) {
        const body: PatchExpenseV1Request = {
          categoryId: Number(form.categoryId),
          amount: form.amount,
          description: form.description,
          expenseDate: toApiDate(form.expenseDate),
          movementType: 'INCOME',
          offsetsSpendingAverage: form.offsetsSpendingAverage,
        };
        await updateIncome.mutateAsync({ id: editing.id, body });
      } else {
        const body: PostExpenseV1Request = {
          categoryId: Number(form.categoryId),
          amount: form.amount,
          description: form.description,
          expenseDate: toApiDate(form.expenseDate),
          movementType: 'INCOME',
          offsetsSpendingAverage: form.offsetsSpendingAverage,
        };
        await createIncome.mutateAsync(body);
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
      await deleteIncome.mutateAsync(deleteTargetId);
      setDeleteTargetId(null);
    } catch (error) {
      await showError(error);
    }
  };

  const isSubmitting = createIncome.isPending || updateIncome.isPending;
  const isDeleting = deleteIncome.isPending;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Ingresos</h1>
          <p className={styles.lead}>Salario, reembolsos y otros ingresos</p>
        </div>
        <Button variant="primary" onClick={openCreate}>
          Nuevo ingreso
        </Button>
      </div>

      <div className={styles.filters}>
        <Field label="Categoría">
          <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">Todas</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
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

      {isLoading && <StateMessage message="Cargando ingresos…" />}
      {isError && <StateMessage message="Error al cargar ingresos" variant="error" />}
      {!isLoading && !isError && (
        <DataTable
          headers={['Fecha', 'Concepto', 'Categoría', 'Compensa media', 'Importe', '']}
          alignRight={[4]}
          isEmpty={incomes.length === 0}
          emptyMessage="No hay ingresos con estos filtros"
        >
          {incomes.map((income) => {
            const category = income.categoryId ? categoryMap.get(income.categoryId) : undefined;
            return (
              <tr key={income.id}>
                <td>{formatDate(income.expenseDate)}</td>
                <td>{income.description}</td>
                <td>
                  <span className={styles.categoryCell}>
                    <CategoryStripe color={category?.color} />
                    {category?.name ?? '—'}
                  </span>
                </td>
                <td>{income.offsetsSpendingAverage ? 'Sí' : 'No'}</td>
                <td style={{ textAlign: 'right' }}>
                  <Amount value={income.amount} />
                </td>
                <td>
                  <div className={styles.rowActions}>
                    <Button size="small" onClick={() => openEdit(income)}>
                      Editar
                    </Button>
                    {income.id && (
                      <Button size="small" variant="danger" onClick={() => setDeleteTargetId(income.id!)}>
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
          title={editing ? 'Editar ingreso' : 'Nuevo ingreso'}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        >
          <Field label="Categoría">
            <Select
              required
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            >
              <option value="">Seleccionar…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Importe">
            <Input
              required
              type="number"
              step="0.01"
              min="0"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
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
        </Modal>
      )}

      <ConfirmDialog
        open={deleteTargetId !== null}
        title="Eliminar ingreso"
        message="¿Seguro que quieres eliminar este ingreso? Esta acción no se puede deshacer."
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
