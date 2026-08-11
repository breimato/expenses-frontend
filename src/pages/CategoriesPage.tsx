import { type FormEvent, useState } from 'react';
import type { CategoryV1, MovementTypeV1, PatchCategoryV1Request, PostCategoryV1Request } from '@/api/generated';
import { Button } from '@/components/ui/Button';
import { CategoryStripe } from '@/components/ui/CategoryStripe';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { DataTable } from '@/components/ui/DataTable';
import { EmojiPicker } from '@/components/ui/EmojiPicker';
import { ErrorDialog } from '@/components/ui/ErrorDialog';
import { Field, Input, Select } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { StateMessage } from '@/components/ui/StateMessage';
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '@/hooks/useCategories';
import { useErrorDialog } from '@/hooks/useErrorDialog';
import styles from './Page.module.css';

type CategoryFormState = {
  name: string;
  color: string;
  icon: string;
  movementType: MovementTypeV1;
};

const emptyForm = (): CategoryFormState => ({
  name: '',
  color: '#6B7280',
  icon: '',
  movementType: 'EXPENSE',
});

export function CategoriesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [editing, setEditing] = useState<CategoryV1 | null>(null);
  const [form, setForm] = useState<CategoryFormState>(emptyForm);

  const { data, isLoading, isError } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const { errorMessage, isGuide, showError, clearError } = useErrorDialog();

  const categories = data?.categories ?? [];

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (category: CategoryV1) => {
    setEditing(category);
    setForm({
      name: category.name ?? '',
      color: category.color ?? '#6B7280',
      icon: category.icon ?? '',
      movementType: category.movementType ?? 'EXPENSE',
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
        const body: PatchCategoryV1Request = {
          name: form.name,
          color: form.color,
          icon: form.icon || null,
          movementType: form.movementType,
        };
        await updateCategory.mutateAsync({ id: editing.id, body });
      } else {
        const body: PostCategoryV1Request = {
          name: form.name,
          color: form.color,
          icon: form.icon || null,
          movementType: form.movementType,
        };
        await createCategory.mutateAsync(body);
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
      await deleteCategory.mutateAsync(deleteTargetId);
      setDeleteTargetId(null);
    } catch (error) {
      await showError(error);
    }
  };

  const isSubmitting = createCategory.isPending || updateCategory.isPending;
  const isDeleting = deleteCategory.isPending;

  return (
    <div className={styles.page}>
      <div className={styles.headerPrimary}>
        <div>
          <h1>Categorías</h1>
          <p className={styles.lead}>Organiza gastos e ingresos</p>
        </div>
        <Button variant="primary" onClick={openCreate}>
          Nueva categoría
        </Button>
      </div>

      {isLoading && <StateMessage message="Cargando categorías…" />}
      {isError && <StateMessage message="Error al cargar categorías" variant="error" />}
      {!isLoading && !isError && (
        <DataTable
          headers={['Color', 'Nombre', 'Tipo', 'Icono', '']}
          hideOnMobile={[3]}
          isEmpty={categories.length === 0}
          emptyMessage="Sin categorías"
        >
          {categories.map((category) => (
            <tr key={category.id}>
              <td>
                <CategoryStripe color={category.color} />
              </td>
              <td>{category.name}</td>
              <td>{category.movementType === 'INCOME' ? 'Ingreso' : 'Gasto'}</td>
              <td>{category.icon ?? '—'}</td>
              <td>
                <div className={styles.rowActions}>
                  <Button size="small" onClick={() => openEdit(category)}>
                    Editar
                  </Button>
                  {category.id && (
                    <Button size="small" variant="danger" onClick={() => setDeleteTargetId(category.id!)}>
                      Borrar
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
      )}

      {modalOpen && (
        <Modal
          title={editing ? 'Editar categoría' : 'Nueva categoría'}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        >
          <Field label="Nombre">
            <Input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="Tipo">
            <Select
              value={form.movementType}
              onChange={(e) => setForm({ ...form, movementType: e.target.value as MovementTypeV1 })}
            >
              <option value="EXPENSE">Gasto</option>
              <option value="INCOME">Ingreso</option>
            </Select>
          </Field>
          <Field label="Color">
            <ColorPicker
              value={form.color}
              onChange={(color) => setForm({ ...form, color })}
            />
          </Field>
          <Field label="Icono">
            <EmojiPicker
              value={form.icon}
              onChange={(emoji) => setForm({ ...form, icon: emoji })}
            />
          </Field>
        </Modal>
      )}

      <ConfirmDialog
        open={deleteTargetId !== null}
        title="Eliminar categoría"
        message="¿Seguro que quieres eliminar esta categoría? Esta acción no se puede deshacer."
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
