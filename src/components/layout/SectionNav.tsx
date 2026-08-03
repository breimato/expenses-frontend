import { NavLink } from 'react-router-dom';
import styles from './SectionNav.module.css';

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/gastos', label: 'Gastos' },
  { to: '/ingresos', label: 'Ingresos' },
  { to: '/plantillas', label: 'Plantillas' },
  { to: '/categorias', label: 'Categorías' },
] as const;

export function SectionNav() {
  return (
    <nav className={styles.nav} aria-label="Secciones">
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
