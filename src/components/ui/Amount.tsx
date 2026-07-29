import { formatAmount } from '@/utils/format';
import styles from './Amount.module.css';

interface AmountProps {
  value: string | number | undefined | null;
  className?: string;
}

export function Amount({ value, className }: AmountProps) {
  const numeric = typeof value === 'string' ? Number.parseFloat(value) : value;
  const isNegative = numeric !== undefined && numeric !== null && !Number.isNaN(numeric) && numeric < 0;

  return (
    <span className={[styles.amount, isNegative && styles.negative, className].filter(Boolean).join(' ')}>
      {formatAmount(value)} €
    </span>
  );
}
