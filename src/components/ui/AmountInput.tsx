import { type InputHTMLAttributes, useRef, useState } from 'react';
import {
  appendAmountOperator,
  evaluateAmountExpression,
  sanitizeAmountTyping,
  stepAmount,
} from '@/utils/amountInput';
import styles from './AmountInput.module.css';

type AmountInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'inputMode' | 'value' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
};

export function AmountInput({
  className,
  value,
  onChange,
  placeholder = '0',
  onBlur,
  onFocus,
  onKeyDown,
  ...props
}: AmountInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const handleStep = (direction: 1 | -1) => {
    onChange(stepAmount(value, direction));
    inputRef.current?.focus();
  };

  const handleOperator = (operator: '+' | '-') => {
    onChange(appendAmountOperator(value, operator));
    inputRef.current?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>
        {focused && (
          <button
            type="button"
            className={styles.stepButton}
            aria-label="Restar importe"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleStep(-1)}
          >
            −
          </button>
        )}
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          enterKeyHint="next"
          autoComplete="off"
          placeholder={placeholder}
          className={[styles.input, className].filter(Boolean).join(' ')}
          value={value}
          onChange={(event) => onChange(sanitizeAmountTyping(event.target.value))}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onChange(evaluateAmountExpression(value));
            onBlur?.(event);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowUp') {
              event.preventDefault();
              handleStep(1);
            }
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              handleStep(-1);
            }
            onKeyDown?.(event);
          }}
          {...props}
        />
        {focused && (
          <button
            type="button"
            className={styles.stepButton}
            aria-label="Sumar importe"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleStep(1)}
          >
            +
          </button>
        )}
      </div>
      {focused && (
        <div className={styles.operatorRow}>
          <span className={styles.hint}>Calcular</span>
          <button
            type="button"
            className={styles.operatorButton}
            aria-label="Añadir suma"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleOperator('+')}
          >
            +
          </button>
          <button
            type="button"
            className={styles.operatorButton}
            aria-label="Añadir resta"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleOperator('-')}
          >
            −
          </button>
        </div>
      )}
    </div>
  );
}
