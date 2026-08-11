import { useState } from 'react';
import { formatAmount } from '@/utils/format';
import { ErrorDialog } from '@/components/ui/ErrorDialog';
import { useErrorDialog } from '@/hooks/useErrorDialog';
import { useQuickAddRecurringTemplate, useRecurringTemplates } from '@/hooks/useRecurringTemplates';
import styles from './QuickAddBar.module.css';

export function QuickAddBar() {
  const { data, isLoading } = useRecurringTemplates();
  const quickAdd = useQuickAddRecurringTemplate();
  const { errorMessage, isGuide, showError, clearError } = useErrorDialog();
  const [pendingId, setPendingId] = useState<number | null>(null);
  const templates = data?.recurringTemplates ?? [];

  if (isLoading) {
    return null;
  }

  const handleQuickAdd = async (id: number) => {
    setPendingId(id);
    try {
      await quickAdd.mutateAsync({ id });
    } catch (error) {
      await showError(error);
    } finally {
      setPendingId(null);
    }
  };

  if (templates.length === 0) {
    return (
      <section className={styles.bar}>
        <p className={styles.heading}>Registro rápido</p>
        <p className={styles.empty}>Crea plantillas en la pestaña Plantillas</p>
      </section>
    );
  }

  return (
    <>
      <section className={styles.bar} aria-label="Registro rápido">
        <p className={styles.heading}>Registro rápido</p>
        <div className={styles.scroll}>
          {templates.map((template) => {
            const isBusy = pendingId === template.id;
            return (
              <button
                key={template.id}
                type="button"
                className={[styles.chip, isBusy && styles.chipBusy].filter(Boolean).join(' ')}
                disabled={pendingId !== null}
                aria-busy={isBusy}
                onClick={() => template.id && handleQuickAdd(template.id)}
              >
                <span className={styles.label}>{template.label}</span>
                <span className={styles.amount}>{formatAmount(template.amount)} €</span>
              </button>
            );
          })}
        </div>
      </section>

      <ErrorDialog
        open={errorMessage !== null}
        message={errorMessage ?? ''}
        isGuide={isGuide}
        onClose={clearError}
      />
    </>
  );
}
