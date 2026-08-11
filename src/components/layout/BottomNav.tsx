import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

const links = [
  { to: '/', label: 'Inicio', end: true, icon: HomeIcon },
  { to: '/gastos', label: 'Gastos', icon: ExpenseIcon },
  { to: '/ingresos', label: 'Ingresos', icon: IncomeIcon },
  { to: '/plantillas', label: 'Plantillas', icon: TemplateIcon },
  { to: '/categorias', label: 'Categorías', icon: CategoryIcon },
] as const;

export function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Secciones">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.to}
            to={link.to}
            end={'end' in link ? link.end : false}
            className={({ isActive }) =>
              [styles.link, isActive && styles.active].filter(Boolean).join(' ')
            }
          >
            <Icon className={styles.icon} />
            <span className={styles.label}>{link.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" strokeLinejoin="round" />
    </svg>
  );
}

function ExpenseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 5v14M8 15l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 8h14" strokeLinecap="round" />
    </svg>
  );
}

function IncomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 19V5M8 9l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 16h14" strokeLinecap="round" />
    </svg>
  );
}

function TemplateIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M9 9h6M9 13h6M9 17h4" strokeLinecap="round" />
    </svg>
  );
}

function CategoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 7h6v6H4V7Zm10-3h6v6h-6V4ZM4 17h6v3H4v-3Zm10-4h6v7h-6v-7Z" strokeLinejoin="round" />
    </svg>
  );
}
