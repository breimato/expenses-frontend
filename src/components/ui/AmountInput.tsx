import { type FocusEvent, type InputHTMLAttributes, useEffect, useRef, useState } from 'react';
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const mobileUi = useMobileUi();

  const handleOperator = (operator: '+' | '-') => {
    onChange(appendAmountOperator(value, operator));
    inputRef.current?.focus();
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && wrapperRef.current?.contains(nextTarget)) {
      return;
    }
    setFocused(false);
    onChange(evaluateAmountExpression(value));
    onBlur?.(event);
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
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
        onBlur={handleBlur}
        {...props}
      />
      {mobileUi && (
        <div className={styles.operatorRow}>
          <button
            type="button"
            className={styles.operatorButton}
            aria-label="Añadir suma"
            onPointerDown={(event) => event.preventDefault()}
            onClick={() => handleOperator('+')}
          >
            +
          </button>
          <button
            type="button"
            className={styles.operatorButton}
            aria-label="Añadir resta"
            onPointerDown={(event) => event.preventDefault()}
            onClick={() => handleOperator('-')}
          >
            −
          </button>
        </div>
      )}
    </div>
  );
}
