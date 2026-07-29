import { Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { NavRail } from './NavRail';
import styles from './AppShell.module.css';

export function AppShell() {
  return (
    <div className={styles.shell}>
      <a href="#main-content" className={styles.skipLink}>
        Saltar al contenido principal
      </a>
      <header className={styles.header}>
        <div className={styles.desktopNav}>
          <NavRail />
        </div>
        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </header>
      <main id="main-content" className={styles.content}>
        <Outlet />
      </main>
      <div className={styles.mobileNav}>
        <NavRail />
      </div>
    </div>
  );
}
