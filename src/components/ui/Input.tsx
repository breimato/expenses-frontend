import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import styles from './Input.module.css';

export { AmountInput } from './AmountInput';

interface FieldProps {
  label: string;
  children: ReactNode;
}

export function Field({ label, children }: FieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      {children}
    </label>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={[styles.input, className].filter(Boolean).join(' ')} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={[styles.select, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </select>
  );
}
