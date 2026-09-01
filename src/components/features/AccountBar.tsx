import { useState } from 'react';
import { Amount } from '@/components/ui/Amount';
import { useAccountContext } from '@/context/AccountContext';
import { AccountManageModal } from './AccountManageModal';
import styles from './AccountBar.module.css';

export function AccountBar() {
  const { activeAccount, isLoading, isError } = useAccountContext();
  const [manageOpen, setManageOpen] = useState(false);

  if (isLoading) {
    return (
      <div className={styles.bar} aria-busy="true">
        <span className={styles.kicker}>Cuenta activa</span>
        <span className={styles.loadingText}>Cargando cuentas…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`${styles.bar} ${styles.barError}`} role="alert">
        <span className={styles.kicker}>Cuenta activa</span>
        <span className={styles.errorText}>No se pudieron cargar las cuentas</span>
      </div>
    );
  }

  if (!activeAccount) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className={styles.bar}
        onClick={() => setManageOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={manageOpen}
      >
        <div className={styles.main}>
          <span className={styles.kicker}>Cuenta activa</span>
          <span className={styles.name}>{activeAccount.name}</span>
        </div>
        <div className={styles.meta}>
          {activeAccount.balance != null && (
            <span className={styles.balance}>
              <Amount value={activeAccount.balance} />
            </span>
          )}
          <span className={styles.chevron} aria-hidden="true">
            Gestionar
          </span>
        </div>
      </button>

      {manageOpen && <AccountManageModal onClose={() => setManageOpen(false)} />}
    </>
  );
}
