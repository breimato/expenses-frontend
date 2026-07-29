import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { resolvedTheme, setMode } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggle = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      aria-pressed={isDark}
      title={isDark ? 'Tema claro' : 'Tema oscuro'}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? '☀' : '☾'}
      </span>
      <span>{isDark ? 'Tema claro' : 'Tema oscuro'}</span>
    </button>
  );
}
