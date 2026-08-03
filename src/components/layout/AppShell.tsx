import { Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { FinanceNav } from '@/components/ui/FinanceNav';
import { SectionNav } from './SectionNav';
import styles from './AppShell.module.css';

export function AppShell() {
  return (
    <div className={styles.shell}>
      <a href="#main-content" className={styles.skipLink}>
        Saltar al contenido principal
      </a>
      <header className={styles.header}>
        <FinanceNav currentServiceId="gastos" />
        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </header>
      <div className={styles.sectionNav}>
        <SectionNav />
      </div>
      <main id="main-content" className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
