import { useTheme, type ThemeMode } from '@/context/ThemeContext';
import styles from './ThemeSelect.module.css';

const options: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Oscuro' },
  { value: 'system', label: 'Sistema' },
];

export function ThemeSelect() {
  const { mode, setMode } = useTheme();

  return (
    <div className={styles.group} role="group" aria-label="Tema de la interfaz">
      <span className={styles.label}>Apariencia</span>
      <div className={styles.options}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={[styles.option, mode === option.value && styles.active]
              .filter(Boolean)
              .join(' ')}
            aria-pressed={mode === option.value}
            onClick={() => setMode(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
