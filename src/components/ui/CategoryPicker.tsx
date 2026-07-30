import type { CategoryV1 } from '@/api/generated';
import styles from './CategoryPicker.module.css';

interface CategoryPickerProps {
  categories: CategoryV1[];
  value: string;
  onChange: (categoryId: string) => void;
  required?: boolean;
}

export function CategoryPicker({ categories, value, onChange, required }: CategoryPickerProps) {
  return (
    <div
      className={styles.wrapper}
      role="listbox"
      aria-required={required}
      aria-label="Categoría"
    >
      {categories.length === 0 ? (
        <p className={styles.empty}>No hay categorías para este tipo</p>
      ) : (
        categories.map((category) => {
          const id = String(category.id ?? '');
          const selected = value === id;
          return (
            <button
              key={category.id}
              type="button"
              role="option"
              aria-selected={selected}
              className={[styles.chip, selected && styles.selected].filter(Boolean).join(' ')}
              onClick={() => onChange(id)}
            >
              {category.color && (
                <span className={styles.dot} style={{ backgroundColor: category.color }} />
              )}
              <span>
                {category.icon ? `${category.icon} ` : ''}
                {category.name}
              </span>
            </button>
          );
        })
      )}
      {required && (
        <input
          tabIndex={-1}
          aria-hidden="true"
          className={styles.hiddenRequired}
          value={value}
          onChange={() => undefined}
          required
        />
      )}
    </div>
  );
}
