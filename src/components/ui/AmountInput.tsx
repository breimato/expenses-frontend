import { type InputHTMLAttributes, type PointerEvent, useEffect, useRef, useState } from 'react';
import {
  appendAmountOperator,
  evaluateAmountExpression,
  sanitizeAmountTyping,
} from '@/utils/amountInput';
import styles from './AmountInput.module.css';

type AmountInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'inputMode' | 'value' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
};

function detectMobileUi(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches ||
    navigator.maxTouchPoints > 0 ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  );
}

function useMobileUi(): boolean {
  const [mobileUi, setMobileUi] = useState(detectMobileUi);

  useEffect(() => {
    const update = () => setMobileUi(detectMobileUi());
    update();
    window.matchMedia('(pointer: coarse)').addEventListener('change', update);
    window.matchMedia('(hover: none)').addEventListener('change', update);
    return () => {
      window.matchMedia('(pointer: coarse)').removeEventListener('change', update);
      window.matchMedia('(hover: none)').removeEventListener('change', update);
    };
  }, []);

  return mobileUi;
}

export function AmountInput({
  className,
  value,
  onChange,
  placeholder = '0',
  required,
  onBlur,
  onFocus,
  ...props
}: AmountInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const mobileUi = useMobileUi();

  const handleOperator = (operator: '+' | '-') => {
    onChange(appendAmountOperator(value, operator));
    inputRef.current?.focus();
  };

  const handleOperatorPointerDown = (operator: '+' | '-') => (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleOperator(operator);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          enterKeyHint="done"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={placeholder}
          required={required}
          className={[styles.input, focused && styles.inputFocused, className].filter(Boolean).join(' ')}
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
          {...props}
        />
        {mobileUi && (
          <>
            <button
              type="button"
              className={styles.operatorButton}
              aria-label="Sumar"
              onPointerDown={handleOperatorPointerDown('+')}
            >
              +
            </button>
            <button
              type="button"
              className={styles.operatorButton}
              aria-label="Restar"
              onPointerDown={handleOperatorPointerDown('-')}
            >
              −
            </button>
          </>
        )}
      </div>
      {mobileUi && focused && (
        <p className={styles.hint}>Usa el teclado numérico para dígitos y estos botones para sumar o restar.</p>
      )}
    </div>
  );
}
