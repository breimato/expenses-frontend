import { createPortal } from 'react-dom';
import { appendAmountKey } from '@/utils/amountInput';
import styles from './AmountKeyboard.module.css';

type AmountKeyboardProps = {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onDone: () => void;
  onDismiss: () => void;
};

const ROWS: Array<Array<{ key: string; label: string; wide?: boolean; operator?: boolean }>> = [
  [
    { key: '7', label: '7' },
    { key: '8', label: '8' },
    { key: '9', label: '9' },
    { key: 'backspace', label: '⌫', operator: true },
  ],
  [
    { key: '4', label: '4' },
    { key: '5', label: '5' },
    { key: '6', label: '6' },
    { key: '+', label: '+', operator: true },
  ],
  [
    { key: '1', label: '1' },
    { key: '2', label: '2' },
    { key: '3', label: '3' },
    { key: '-', label: '−', operator: true },
  ],
  [
    { key: ',', label: ',' },
    { key: '0', label: '0', wide: true },
    { key: 'equals', label: '=', operator: true },
  ],
];

export function AmountKeyboard({ open, value, onChange, onDone, onDismiss }: AmountKeyboardProps) {
  if (!open || typeof document === 'undefined') {
    return null;
  }

  const handleKey = (key: string) => {
    onChange(appendAmountKey(value, key));
  };

  return createPortal(
    <div className={styles.overlay} onClick={onDismiss} role="presentation">
      <div className={styles.keyboard} onClick={(event) => event.stopPropagation()} role="group" aria-label="Teclado numérico">
        <div className={styles.pad}>
          {ROWS.flatMap((row) =>
            row.map((item) => (
              <button
                key={item.label}
                type="button"
                className={
                  item.wide ? styles.keyWide : item.operator ? styles.keyOperator : styles.key
                }
                onClick={() => handleKey(item.key)}
              >
                {item.label}
              </button>
            )),
          )}
          <button type="button" className={styles.keyDone} onClick={onDone}>
            Listo
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
