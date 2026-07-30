import type { FormEvent, ReactNode } from 'react';
import { Button } from './Button';
import styles from './Modal.module.css';

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export function Modal({
  title,
  onClose,
  onSubmit,
  children,
  submitLabel = 'Guardar',
  isSubmitting = false,
}: ModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.panel}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
          <Button variant="ghost" size="small" onClick={onClose} type="button">
            Cerrar
          </Button>
        </div>
        <form className={styles.formShell} onSubmit={onSubmit}>
          <div className={styles.form}>{children}</div>
          <div className={styles.actions}>
            <Button variant="ghost" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
