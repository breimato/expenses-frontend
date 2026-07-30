import { type FormEvent, useState } from 'react';
import type {
  MovementTypeV1,
  PatchRecurringTemplateV1Request,
  PostRecurringTemplateV1Request,
  RecurringFrequencyV1,
  RecurringTemplateV1,
} from '@/api/generated';
import { Amount } from '@/components/ui/Amount';
import { Button } from '@/components/ui/Button';
import { CategoryPicker } from '@/components/ui/CategoryPicker';
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
  useApplyPendingRecurringTemplates,
  useCreateRecurringTemplate,
  useDeleteRecurringTemplate,
  useQuickAddRecurringTemplate,
  useRecurringTemplates,
  useUpdateRecurringTemplate,
} from '@/hooks/useRecurringTemplates';
import { formatDate } from '@/utils/format';
import styles from './Page.module.css';

type TemplateFormState = {
  label: string;
  amount: string;
  categoryId: string;
  sortOrder: string;
  movementType: MovementTypeV1;
  offsetsSpendingAverage: boolean;
  frequency: RecurringFrequencyV1;
  dayOfMonth: string;
  autoApply: boolean;
  enabled: boolean;
};

const emptyForm = (): TemplateFormState => ({
  label: '',
  amount: '',
  categoryId: '',
  sortOrder: '0',
  movementType: 'EXPENSE',
  offsetsSpendingAverage: false,
  frequency: 'MANUAL',
  dayOfMonth: '1',
  autoApply: false,
  enabled: true,
});

function templateTypeLabel(type?: MovementTypeV1) {
  return type === 'INCOME' ? 'Ingreso' : 'Gasto';
}

export function RecurringPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [editing, setEditing] = useState<RecurringTemplateV1 | null>(null);
  const [form, setForm] = useState<TemplateFormState>(emptyForm);
  const [applyMessage, setApplyMessage] = useState<string | null>(null);

  const { data: expenseCategories } = useCategories({ movementType: 'EXPENSE' });
  const { data: incomeCategories } = useCategories({ movementType: 'INCOME' });
  const { data, isLoading, isError } = useRecurringTemplates();
  const createTemplate = useCreateRecurringTemplate();
  const updateTemplate = useUpdateRecurringTemplate();
  const deleteTemplate = useDeleteRecurringTemplate();
  const quickAdd = useQuickAddRecurringTemplate();
  const applyPending = useApplyPendingRecurringTemplates();
  const { errorMessage, isGuide, showError, clearError } = useErrorDialog();

  const allCategories = [...(expenseCategories?.categories ?? []), ...(incomeCategories?.categories ?? [])];
  const categoryMap = new Map(allCategories.map((c) => [c.id, c]));
  const templates = data?.recurringTemplates ?? [];
  const formCategories = form.movementType === 'INCOME'
    ? (incomeCategories?.categories ?? [])
    : (expenseCategories?.categories ?? []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (template: RecurringTemplateV1) => {
    setEditing(template);
    setForm({
      label: template.label ?? '',
      amount: template.amount ?? '',
      categoryId: String(template.categoryId ?? ''),
      sortOrder: String(template.sortOrder ?? 0),
      movementType: template.movementType ?? 'EXPENSE',
      offsetsSpendingAverage: template.offsetsSpendingAverage ?? false,
      frequency: template.frequency ?? 'MANUAL',
      dayOfMonth: String(template.dayOfMonth ?? 1),
      autoApply: template.autoApply ?? false,
      enabled: template.enabled ?? true,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const base = {
      label: form.label,
      amount: form.amount,
      categoryId: Number(form.categoryId),
      sortOrder: Number(form.sortOrder),
      movementType: form.movementType,
      offsetsSpendingAverage: form.movementType === 'INCOME' ? form.offsetsSpendingAverage : false,
      frequency: form.frequency,
      dayOfMonth: form.frequency === 'MONTHLY' ? Number(form.dayOfMonth) : undefined,
      autoApply: form.autoApply,
      enabled: form.enabled,
    };

    try {
      if (editing?.id) {
        const body: PatchRecurringTemplateV1Request = base;
        await updateTemplate.mutateAsync({ id: editing.id, body });
      } else {
        const body: PostRecurringTemplateV1Request = base;
        await createTemplate.mutateAsync(body);
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
      await deleteTemplate.mutateAsync(deleteTargetId);
      setDeleteTargetId(null);
    } catch (error) {
      await showError(error);
    }
  };

  const handleApplyPending = async () => {
    try {
      const result = await applyPending.mutateAsync();
      const count = result.appliedCount ?? 0;
      setApplyMessage(
        count > 0 ? `Se aplicaron ${count} plantilla(s) pendiente(s).` : 'No había plantillas pendientes.',
      );
    } catch (error) {
      await showError(error);
    }
  };

  const isSubmitting = createTemplate.isPending || updateTemplate.isPending;
  const isDeleting = deleteTemplate.isPending;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Plantillas</h1>
          <p className={styles.lead}>Gastos e ingresos recurrentes</p>
        </div>
        <div className={styles.toolbar}>
          <Button
            variant="ghost"
            disabled={applyPending.isPending}
            onClick={handleApplyPending}
          >
            Aplicar pendientes
          </Button>
          <Button variant="primary" onClick={openCreate}>
            Nueva plantilla
          </Button>
        </div>
      </div>

      {applyMessage && <StateMessage message={applyMessage} />}

      {isLoading && <StateMessage message="Cargando plantillas…" />}
      {isError && <StateMessage message="Error al cargar plantillas" variant="error" />}
      {!isLoading && !isError && (
        <DataTable
          headers={['Nombre', 'Tipo', 'Categoría', 'Importe', 'Programación', 'Último uso', '']}
          alignRight={[3]}
          isEmpty={templates.length === 0}
          emptyMessage="Sin plantillas todavía"
        >
          {templates.map((template) => {
            const category = template.categoryId ? categoryMap.get(template.categoryId) : undefined;
            const schedule =
              template.frequency === 'MONTHLY'
                ? `Día ${template.dayOfMonth ?? '—'}${template.autoApply ? ' · auto' : ''}`
                : 'Manual';
            return (
              <tr key={template.id}>
                <td>
                  {template.label}
                  {template.enabled === false && <span className={styles.badge}> Inactiva</span>}
                </td>
                <td>{templateTypeLabel(template.movementType)}</td>
                <td>
                  <span className={styles.categoryCell}>
                    <CategoryStripe color={category?.color} />
                    {category?.name ?? '—'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Amount value={template.amount} />
                </td>
                <td>{schedule}</td>
                <td>{template.lastUsedAt ? formatDate(template.lastUsedAt) : '—'}</td>
                <td>
                  <div className={styles.rowActions}>
                    {template.id && (
                      <Button
                        size="small"
                        variant="primary"
                        disabled={quickAdd.isPending}
                        onClick={() => quickAdd.mutate({ id: template.id! })}
                      >
                        Registrar
                      </Button>
                    )}
                    <Button size="small" onClick={() => openEdit(template)}>
                      Editar
                    </Button>
                    {template.id && (
                      <Button size="small" variant="danger" onClick={() => setDeleteTargetId(template.id!)}>
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
          title={editing ? 'Editar plantilla' : 'Nueva plantilla'}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        >
          <Field label="Nombre">
            <Input
              required
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
            />
          </Field>
          <Field label="Tipo">
            <Select
              value={form.movementType}
              onChange={(e) =>
                setForm({
                  ...form,
                  movementType: e.target.value as MovementTypeV1,
                  categoryId: '',
                })
              }
            >
              <option value="EXPENSE">Gasto</option>
              <option value="INCOME">Ingreso</option>
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
          <Field label="Categoría">
            <CategoryPicker
              required
              categories={formCategories}
              value={form.categoryId}
              onChange={(categoryId) => setForm({ ...form, categoryId })}
            />
          </Field>
          <Field label="Frecuencia">
            <Select
              value={form.frequency}
              onChange={(e) =>
                setForm({ ...form, frequency: e.target.value as RecurringFrequencyV1 })
              }
            >
              <option value="MANUAL">Manual</option>
              <option value="MONTHLY">Mensual</option>
            </Select>
          </Field>
          {form.frequency === 'MONTHLY' && (
            <>
              <Field label="Día del mes">
                <Input
                  required
                  type="number"
                  min="1"
                  max="31"
                  value={form.dayOfMonth}
                  onChange={(e) => setForm({ ...form, dayOfMonth: e.target.value })}
                />
              </Field>
              <Field label="Aplicación automática">
                <label className={styles.checkboxRow}>
                  <input
                    type="checkbox"
                    checked={form.autoApply}
                    onChange={(e) => setForm({ ...form, autoApply: e.target.checked })}
                  />
                  <span>Generar movimiento automáticamente cada mes</span>
                </label>
              </Field>
            </>
          )}
          {form.movementType === 'INCOME' && (
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
          )}
          <Field label="Activa">
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
              />
              <span>La plantilla está habilitada</span>
            </label>
          </Field>
          <Field label="Orden">
            <Input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
            />
          </Field>
        </Modal>
      )}

      <ConfirmDialog
        open={deleteTargetId !== null}
        title="Eliminar plantilla"
        message="¿Seguro que quieres eliminar esta plantilla? Esta acción no se puede deshacer."
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
