import { type FormEvent, type MouseEvent, useState } from 'react';
import type { AccountV1 } from '@/api/generated';
import { Amount } from '@/components/ui/Amount';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { ErrorDialog } from '@/components/ui/ErrorDialog';
import { useAccountContext } from '@/context/AccountContext';
import { useCreateAccount, useUpdateAccount } from '@/hooks/useAccounts';
import { useErrorDialog } from '@/hooks/useErrorDialog';
import { AccountTransferModal } from './AccountTransferModal';
import styles from './AccountManageModal.module.css';

type AccountManageModalProps = {
  onClose: () => void;
};

type PanelView = 'list' | 'create' | 'rename' | 'transfer';

export function AccountManageModal({ onClose }: AccountManageModalProps) {
  const { accounts, activeAccountId, setActiveAccountId } = useAccountContext();
  const createAccount = useCreateAccount();
  const updateAccount = useUpdateAccount();
  const { errorMessage, isGuide, showError, clearError } = useErrorDialog();

  const [view, setView] = useState<PanelView>('list');
  const [newAccountName, setNewAccountName] = useState('');
  const [renamingAccount, setRenamingAccount] = useState<AccountV1 | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const handleSelectAccount = (accountId: number) => {
    setActiveAccountId(accountId);
    onClose();
  };

  const openRename = (account: AccountV1, event: MouseEvent) => {
    event.stopPropagation();
    setRenamingAccount(account);
    setRenameValue(account.name ?? '');
    setView('rename');
  };

  const handleCreateAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = newAccountName.trim();
    if (!name) {
      return;
    }
    try {
      const response = await createAccount.mutateAsync({ name });
      if (response.account?.id != null) {
        setActiveAccountId(response.account.id);
      }
      setNewAccountName('');
      onClose();
    } catch (error) {
      await showError(error);
    }
  };

  const handleRenameAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = renameValue.trim();
    if (!renamingAccount?.id || !name) {
      return;
    }
    try {
      await updateAccount.mutateAsync({ id: renamingAccount.id, body: { name } });
      setRenamingAccount(null);
      setRenameValue('');
      setView('list');
    } catch (error) {
      await showError(error);
    }
  };

  if (view === 'transfer') {
    return <AccountTransferModal onClose={() => setView('list')} />;
  }

  if (view === 'create') {
    return (
      <>
        <Modal
          title="Nueva cuenta"
          onClose={() => setView('list')}
          onSubmit={handleCreateAccount}
          submitLabel="Crear"
          isSubmitting={createAccount.isPending}
        >
          <Field label="Nombre">
            <Input
              required
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              placeholder="Ej. Ahorros"
              autoFocus
            />
          </Field>
        </Modal>
        <ErrorDialog
          open={errorMessage !== null}
          message={errorMessage ?? ''}
          isGuide={isGuide}
          onClose={clearError}
        />
      </>
    );
  }

  if (view === 'rename' && renamingAccount) {
    return (
      <>
        <Modal
          title="Renombrar cuenta"
          onClose={() => {
            setView('list');
            setRenamingAccount(null);
          }}
          onSubmit={handleRenameAccount}
          submitLabel="Guardar"
          isSubmitting={updateAccount.isPending}
        >
          <Field label="Nombre">
            <Input
              required
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              autoFocus
            />
          </Field>
        </Modal>
        <ErrorDialog
          open={errorMessage !== null}
          message={errorMessage ?? ''}
          isGuide={isGuide}
          onClose={clearError}
        />
      </>
    );
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose} role="presentation">
        <div
          className={styles.panel}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="account-manage-title"
        >
          <header className={styles.header}>
            <div>
              <h2 id="account-manage-title" className={styles.title}>
                Mis cuentas
              </h2>
              <p className={styles.subtitle}>Elige la cuenta con la que quieres trabajar</p>
            </div>
            <Button variant="ghost" size="small" onClick={onClose} type="button">
              Cerrar
            </Button>
          </header>

          <ul className={styles.list}>
            {accounts.map((account) => {
              const isActive = account.id === activeAccountId;
              return (
                <li
                  key={account.id}
                  className={[styles.accountItem, isActive && styles.accountItemActive]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <button
                    type="button"
                    className={styles.selectArea}
                    onClick={() => account.id != null && handleSelectAccount(account.id)}
                  >
                    <div className={styles.accountMain}>
                      <span className={styles.accountName}>{account.name}</span>
                      {account.balance != null && (
                        <span className={styles.accountBalance}>
                          <Amount value={account.balance} />
                        </span>
                      )}
                    </div>
                    {isActive && <span className={styles.activeBadge}>Activa</span>}
                  </button>
                  <Button
                    size="small"
                    variant="ghost"
                    type="button"
                    className={styles.renameButton}
                    aria-label={`Renombrar ${account.name}`}
                    onClick={(event) => openRename(account, event)}
                  >
                    Renombrar
                  </Button>
                </li>
              );
            })}
          </ul>

          <footer className={styles.footer}>
            <Button variant="ghost" type="button" onClick={() => setView('transfer')}>
              Transferir
            </Button>
            <Button variant="primary" type="button" onClick={() => setView('create')}>
              Nueva cuenta
            </Button>
          </footer>
        </div>
      </div>

      <ErrorDialog
        open={errorMessage !== null}
        message={errorMessage ?? ''}
        isGuide={isGuide}
        onClose={clearError}
      />
    </>
  );
}
