import { Button } from './Button';
import styles from './ConfirmDialog.module.css';
import errorStyles from './ErrorDialog.module.css';

interface ErrorDialogProps {
  open: boolean;
  title?: string;
  message: string;
  isGuide?: boolean;
  onClose: () => void;
}

export function ErrorDialog({
  open,
  title,
  message,
  isGuide = false,
  onClose,
}: ErrorDialogProps) {
  if (!open) {
    return null;
  }

  const resolvedTitle = title ?? (isGuide ? 'Atención' : 'Error');

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={[styles.panel, isGuide ? errorStyles.guide : errorStyles.error]
          .filter(Boolean)
          .join(' ')}
        onClick={(event) => event.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-message"
      >
        <div className={errorStyles.header}>
          <span className={errorStyles.icon} aria-hidden="true">
            {isGuide ? '💡' : '⚠️'}
          </span>
          <h2 id="error-dialog-title" className={styles.title}>
            {resolvedTitle}
          </h2>
        </div>
        <p id="error-dialog-message" className={styles.message}>
          {message}
        </p>
        <div className={styles.actions}>
          <Button variant="primary" onClick={onClose} type="button">
            Entendido
          </Button>
        </div>
      </div>
    </div>
  );
}
