import { type FormEvent, useMemo, useState } from 'react';
import type { ExpenseV1, PatchExpenseV1Request, PostExpenseV1Request } from '@/api/generated';
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

type ExpenseFormState = {
  categoryId: string;
  amount: string;
  description: string;
  expenseDate: string;
  offsetsSpendingAverage: boolean;
};

const emptyForm = (): ExpenseFormState => ({
  categoryId: '',
  amount: '',
  description: '',
  expenseDate: todayIsoDate(),
  offsetsSpendingAverage: false,
});

export function ExpensesPage() {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [editing, setEditing] = useState<ExpenseV1 | null>(null);
  const [form, setForm] = useState<ExpenseFormState>(emptyForm);

  const filters = useMemo(
    () => ({
      movementType: 'EXPENSE' as const,
      categoryId: categoryFilter ? Number(categoryFilter) : undefined,
      expenseDate: dateFilter ? toApiDate(dateFilter) : undefined,
      description: descriptionFilter || undefined,
    }),
    [categoryFilter, dateFilter, descriptionFilter],
  );

  const { data: categoriesData } = useCategories({ movementType: 'EXPENSE' });
  const { data, isLoading, isError } = useExpenses(filters);
  const createExpense = useCreateExpense();
  const updateExpense = useUpdateExpense();
  const deleteExpense = useDeleteExpense();
  const { errorMessage, isGuide, showError, clearError } = useErrorDialog();

  const categories = categoriesData?.categories ?? [];
  const categoryMap = new Map(categories.map((c) => [c.id, c]));
  const expenses = data?.expenses ?? [];

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (expense: ExpenseV1) => {
    setEditing(expense);
    setForm({
      categoryId: String(expense.categoryId ?? ''),
      amount: expense.amount ?? '',
      description: expense.description ?? '',
      expenseDate: toInputDate(expense.expenseDate),
      offsetsSpendingAverage: expense.offsetsSpendingAverage ?? false,
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
          offsetsSpendingAverage: form.offsetsSpendingAverage,
        };
        await updateExpense.mutateAsync({ id: editing.id, body });
      } else {
        const body: PostExpenseV1Request = {
          categoryId: Number(form.categoryId),
          amount: form.amount,
          description: form.description,
          expenseDate: toApiDate(form.expenseDate),
          movementType: 'EXPENSE',
          offsetsSpendingAverage: form.offsetsSpendingAverage,
        };
        await createExpense.mutateAsync(body);
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
      await deleteExpense.mutateAsync(deleteTargetId);
      setDeleteTargetId(null);
    } catch (error) {
      await showError(error);
    }
  };

  const isSubmitting = createExpense.isPending || updateExpense.isPending;
  const isDeleting = deleteExpense.isPending;

  return (
    <div className={styles.page}>
      <div className={styles.headerPrimary}>
        <div>
          <h1>Gastos</h1>
          <p className={styles.lead}>Registro y consulta</p>
        </div>
        <Button variant="primary" onClick={openCreate}>
          Nuevo gasto
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

      {isLoading && <StateMessage message="Cargando gastos…" />}
      {isError && <StateMessage message="Error al cargar gastos" variant="error" />}
      {!isLoading && !isError && (
        <DataTable
          headers={['Fecha', 'Concepto', 'Categoría', 'Excluye media', 'Importe', '']}
          alignRight={[4]}
          hideOnMobile={[3]}
          isEmpty={expenses.length === 0}
          emptyMessage="No hay gastos con estos filtros"
        >
          {expenses.map((expense) => {
            const category = expense.categoryId ? categoryMap.get(expense.categoryId) : undefined;
            return (
              <tr key={expense.id}>
                <td>{formatDate(expense.expenseDate)}</td>
                <td>{expense.description}</td>
                <td>
                  <span className={styles.categoryCell}>
                    <CategoryStripe color={category?.color} />
                    {category?.name ?? '—'}
                  </span>
                </td>
                <td>{expense.offsetsSpendingAverage ? 'Sí' : 'No'}</td>
                <td style={{ textAlign: 'right' }}>
                  <Amount value={expense.amount} />
                </td>
                <td>
                  <div className={styles.rowActions}>
                    <Button size="small" onClick={() => openEdit(expense)}>
                      Editar
                    </Button>
                    {expense.id && (
                      <Button size="small" variant="danger" onClick={() => setDeleteTargetId(expense.id!)}>
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
          title={editing ? 'Editar gasto' : 'Nuevo gasto'}
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
              type="text"
              inputMode="decimal"
              autoComplete="off"
              enterKeyHint="next"
              placeholder="0.00"
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
        </Modal>
      )}

      <ConfirmDialog
        open={deleteTargetId !== null}
        title="Eliminar gasto"
        message="¿Seguro que quieres eliminar este gasto? Esta acción no se puede deshacer."
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
