import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import styles from './Input.module.css';

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

type AmountInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'inputMode' | 'value' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
};

export function AmountInput({ className, value, onChange, placeholder = '0,00', ...props }: AmountInputProps) {
  return (
    <Input
      type="text"
      inputMode="decimal"
      autoComplete="off"
      enterKeyHint="next"
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={(event) => onChange(event.target.value.replace(/[^\d.,]/g, ''))}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={[styles.select, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </select>
  );
}
