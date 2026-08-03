import {
  FINANCE_HUB_PATH,
  FINANCE_SERVICES,
  type FinanceServiceId,
} from '@/data/financeServices';
import styles from './FinanceNav.module.css';

interface FinanceNavProps {
  currentServiceId: Exclude<FinanceServiceId, 'hub'>;
}

export function FinanceNav({ currentServiceId }: FinanceNavProps) {
  return (
    <nav className={styles.nav} aria-label="Navegación de la suite financiera">
      <a href={FINANCE_HUB_PATH} className={styles.link}>
        Inicio
      </a>
      {FINANCE_SERVICES.map((service) => (
        <a
          key={service.id}
          href={service.href}
          className={styles.link}
          aria-current={service.id === currentServiceId ? 'page' : undefined}
        >
          {service.title}
        </a>
      ))}
    </nav>
  );
}
