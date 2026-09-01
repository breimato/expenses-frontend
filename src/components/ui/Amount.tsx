import { formatAmount } from '@/utils/format';
import styles from './Amount.module.css';

interface AmountProps {
  value: string | number | undefined | null;
  className?: string;
  /** Prefix positive amounts with + (e.g. income or transfer in). */
  signed?: boolean;
}

export function Amount({ value, className, signed = false }: AmountProps) {
  const numeric = typeof value === 'string' ? Number.parseFloat(value) : value;
  const isNegative = numeric !== undefined && numeric !== null && !Number.isNaN(numeric) && numeric < 0;
  const formatted = formatAmount(value);
  const display = signed && numeric != null && !Number.isNaN(numeric) && numeric > 0 ? `+${formatted}` : formatted;

  return (
    <span className={[styles.amount, isNegative && styles.negative, className].filter(Boolean).join(' ')}>
      {display} €
    </span>
  );
}
