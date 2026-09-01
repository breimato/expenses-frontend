import { type FormEvent, useState } from 'react';
import { todayIsoDate } from '@/api/client';
import { Button } from '@/components/ui/Button';
import { AmountInput, Field, Input, Select } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useAccountContext } from '@/context/AccountContext';
import { useCreateAccountTransfer } from '@/hooks/useAccounts';
import { useErrorDialog } from '@/hooks/useErrorDialog';
import { toApiAmount, toApiDate } from '@/utils/format';
import { ErrorDialog } from '@/components/ui/ErrorDialog';
import styles from './AccountTransferModal.module.css';

type AccountTransferModalProps = {
  onClose: () => void;
};

export function AccountTransferModal({ onClose }: AccountTransferModalProps) {
  const { accounts, activeAccountId } = useAccountContext();
  const createTransfer = useCreateAccountTransfer();
  const { errorMessage, isGuide, showError, clearError } = useErrorDialog();

  const otherAccounts = accounts.filter((account) => account.id !== activeAccountId);
  const [toAccountId, setToAccountId] = useState(() => String(otherAccounts[0]?.id ?? ''));
  const [amount, setAmount] = useState('');
  const [transferDate, setTransferDate] = useState(todayIsoDate());
  const [description, setDescription] = useState('Transferencia');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeAccountId || !toAccountId) {
      return;
    }
    try {
      await createTransfer.mutateAsync({
        fromAccountId: activeAccountId,
        toAccountId: Number(toAccountId),
        amount: toApiAmount(amount),
        transferDate: toApiDate(transferDate),
        description,
      });
      onClose();
    } catch (error) {
      await showError(error);
    }
  };

  if (otherAccounts.length === 0) {
    return (
      <Modal title="Transferir dinero" onClose={onClose} onSubmit={(e) => e.preventDefault()}>
        <p className={styles.hint}>Necesitas al menos dos cuentas para hacer una transferencia.</p>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        title="Transferir dinero"
        onClose={onClose}
        onSubmit={handleSubmit}
        submitLabel="Transferir"
        isSubmitting={createTransfer.isPending}
      >
        <Field label="Desde">
          <Input
            readOnly
            value={accounts.find((account) => account.id === activeAccountId)?.name ?? 'Cuenta activa'}
          />
        </Field>
        <Field label="Hacia">
          <Select required value={toAccountId} onChange={(e) => setToAccountId(e.target.value)}>
            <option value="">Seleccionar cuenta…</option>
            {otherAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Importe">
          <AmountInput required value={amount} onChange={setAmount} />
        </Field>
        <Field label="Fecha">
          <Input
            required
            type="date"
            value={transferDate}
            onChange={(e) => setTransferDate(e.target.value)}
          />
        </Field>
        <Field label="Descripción">
          <Input required value={description} onChange={(e) => setDescription(e.target.value)} />
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
