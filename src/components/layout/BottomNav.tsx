import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/gastos', label: 'Gastos' },
  { to: '/ingresos', label: 'Ingresos' },
  { to: '/ajustes', label: 'Ajustes' },
] as const;

export function BottomNav() {
  return (
    <nav className={styles.bottomNav} aria-label="Navegación móvil">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={'end' in link ? link.end : false}
          className={({ isActive }) => [styles.link, isActive && styles.active].filter(Boolean).join(' ')}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
