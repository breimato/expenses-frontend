import { type FormEvent, useMemo, useState } from 'react';
import type { ExpenseV1, MovementTypeV1, PatchExpenseV1Request, PostExpenseV1Request } from '@/api/generated';
import { todayIsoDate } from '@/api/client';
import { ExpensesByDayList } from '@/components/features/ExpensesByDayList';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
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
import {
  isTransfer,
  MANUAL_MOVEMENT_TYPES,
  manualMovementTypeLabel,
  matchesMovementFilter,
  movementTypeLabel,
  MOVEMENT_FILTER_OPTIONS,
  type MovementFilter,
} from '@/utils/movementType';
import styles from './Page.module.css';

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

function categoryFilterMovementType(filter: MovementFilter): MovementTypeV1 | undefined {
  if (!filter || filter === 'TRANSFER') {
    return undefined;
  }
  return filter;
}

export function MovementsPage() {
  const [typeFilter, setTypeFilter] = useState<MovementFilter>('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ExpenseV1 | null>(null);
  const [editing, setEditing] = useState<ExpenseV1 | null>(null);
  const [form, setForm] = useState<MovementFormState>(emptyForm);

  const apiMovementType = categoryFilterMovementType(typeFilter);

  const filters = useMemo(
    () => ({
      movementType: apiMovementType,
      categoryId: apiMovementType && categoryFilter ? Number(categoryFilter) : undefined,
      expenseDate: dateFilter ? toApiDate(dateFilter) : undefined,
      description: descriptionFilter || undefined,
    }),
    [apiMovementType, categoryFilter, dateFilter, descriptionFilter],
  );

  const { data: allCategoriesData } = useCategories();
  const { data: transferOutCategoriesData } = useCategories({ movementType: 'TRANSFER_OUT' });
  const { data: transferInCategoriesData } = useCategories({ movementType: 'TRANSFER_IN' });
  const { data: filterCategoriesData } = useCategories(
    apiMovementType ? { movementType: apiMovementType } : undefined,
  );
  const formCategoryMovementType = form.movementType;
  const { data: formCategoriesData } = useCategories({ movementType: formCategoryMovementType });
  const { data, isLoading, isError } = useExpenses(filters);
  const { data: linkableExpensesData } = useExpenses({ movementType: 'EXPENSE' });
  const createMovement = useCreateExpense();
  const updateMovement = useUpdateExpense();
  const deleteMovement = useDeleteExpense();
  const { errorMessage, isGuide, showError, clearError } = useErrorDialog();

  const allCategories = allCategoriesData?.categories ?? [];
  const filterCategories =
    typeFilter === 'TRANSFER'
      ? [
          ...(transferOutCategoriesData?.categories ?? []),
          ...(transferInCategoriesData?.categories ?? []),
        ]
      : (filterCategoriesData?.categories ?? []);
  const formCategories = formCategoriesData?.categories ?? [];
  const categoryMap = new Map(allCategories.map((category) => [category.id, category]));
  const movements = useMemo(() => {
    const expenses = data?.expenses ?? [];
    if (typeFilter === 'TRANSFER') {
      return expenses.filter((expense) => matchesMovementFilter(expense.movementType, typeFilter));
    }
    return expenses;
  }, [data?.expenses, typeFilter]);
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

  const editingTransfer = Boolean(editing && isTransfer(editing.movementType));
  const formIsTransfer = isTransfer(form.movementType);

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value as MovementFilter);
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
    const offsetsSpendingAverage = formIsTransfer
      ? false
      : form.movementType === 'INCOME'
        ? reimbursedExpenseId != null
        : form.offsetsSpendingAverage;
    try {
      if (editing?.id) {
        const body: PatchExpenseV1Request = {
          categoryId: Number(form.categoryId),
          amount: toApiAmount(form.amount),
          description: form.description,
          expenseDate: toApiDate(form.expenseDate),
          movementType: form.movementType,
          offsetsSpendingAverage,
          reimbursedExpenseId: formIsTransfer ? null : reimbursedExpenseId,
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
    if (!deleteTarget?.id) {
      return;
    }
    try {
      await deleteMovement.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
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
          <p className={styles.lead}>Gastos, ingresos y transferencias</p>
        </div>
        <Button variant="primary" onClick={openCreate}>
          Nuevo movimiento
        </Button>
      </div>

      <div className={styles.filters}>
        <Field label="Tipo">
          <Select value={typeFilter} onChange={(e) => handleTypeFilterChange(e.target.value)}>
            {MOVEMENT_FILTER_OPTIONS.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
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
        <ExpensesByDayList
          expenses={movements}
          categoryMap={categoryMap}
          emptyMessage="No hay movimientos con estos filtros"
          showMovementType
          renderActions={(movement) => (
            <>
              <Button size="small" onClick={() => openEdit(movement)}>
                Editar
              </Button>
              {movement.id && (
                <Button size="small" variant="danger" onClick={() => setDeleteTarget(movement)}>
                  Borrar
                </Button>
              )}
            </>
          )}
        />
      )}

      {modalOpen && (
        <Modal
          title={
            editingTransfer
              ? 'Editar transferencia'
              : editing
                ? 'Editar movimiento'
                : 'Nuevo movimiento'
          }
          onClose={closeModal}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        >
          {formIsTransfer ? (
            <>
              <Field label="Tipo">
                <Input readOnly value={movementTypeLabel(form.movementType)} />
              </Field>
              <Field label="Sentido">
                <Input
                  readOnly
                  value={form.movementType === 'TRANSFER_IN' ? 'Entrada en esta cuenta' : 'Salida de esta cuenta'}
                />
              </Field>
              <Field label="Categoría">
                <Input readOnly value="Transferencia" />
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
              <p className={styles.transferHint}>
                Los cambios se aplican a la transferencia completa en ambas cuentas.
              </p>
            </>
          ) : (
            <>
              <Field label="Tipo">
                <Select
                  required
                  value={form.movementType}
                  onChange={(e) => handleFormMovementTypeChange(e.target.value)}
                >
                  {MANUAL_MOVEMENT_TYPES.map((movementType) => (
                    <option key={movementType} value={movementType}>
                      {manualMovementTypeLabel(movementType)}
                    </option>
                  ))}
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
                  <Select
                    value={form.reimbursedExpenseId}
                    onChange={(e) => handleReimbursedExpenseChange(e.target.value)}
                  >
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
            </>
          )}
        </Modal>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title={deleteTarget && isTransfer(deleteTarget.movementType) ? 'Eliminar transferencia' : 'Eliminar movimiento'}
        message={
          deleteTarget && isTransfer(deleteTarget.movementType)
            ? 'Se eliminará la transferencia completa en ambas cuentas. Esta acción no se puede deshacer.'
            : '¿Seguro que quieres eliminar este movimiento? Esta acción no se puede deshacer.'
        }
        confirmLabel="Eliminar"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
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
