import { type FocusEvent, type InputHTMLAttributes, useEffect, useState } from 'react';
import {
  appendAmountOperator,
  evaluateAmountExpression,
  sanitizeAmountTyping,
  stepAmount,
} from '@/utils/amountInput';
import { AmountKeyboard } from './AmountKeyboard';
import styles from './AmountInput.module.css';

type AmountInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'inputMode' | 'value' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
};

function detectTouchDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches ||
    navigator.maxTouchPoints > 0
  );
}

function useTouchDevice(): boolean {
  const [touchDevice, setTouchDevice] = useState(detectTouchDevice);

  useEffect(() => {
    const update = () => setTouchDevice(detectTouchDevice());
    update();

    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const hoverQuery = window.matchMedia('(hover: none)');
    coarseQuery.addEventListener('change', update);
    hoverQuery.addEventListener('change', update);
    return () => {
      coarseQuery.removeEventListener('change', update);
      hoverQuery.removeEventListener('change', update);
    };
  }, []);

  return touchDevice;
}

export function AmountInput({
  className,
  value,
  onChange,
  placeholder = '0',
  required,
  onBlur,
  onFocus,
  onKeyDown,
  ...props
}: AmountInputProps) {
  const [focused, setFocused] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const touchDevice = useTouchDevice();

  const handleStep = (direction: 1 | -1) => {
    onChange(stepAmount(value, direction));
  };

  const handleOperator = (operator: '+' | '-') => {
    onChange(appendAmountOperator(value, operator));
  };

  const openKeyboard = () => {
    setFocused(true);
    setKeyboardOpen(true);
    onFocus?.({} as FocusEvent<HTMLInputElement>);
  };

  const closeKeyboard = () => {
    setKeyboardOpen(false);
    setFocused(false);
    onChange(evaluateAmountExpression(value));
    onBlur?.({} as FocusEvent<HTMLInputElement>);
  };

  if (touchDevice) {
    return (
      <>
        <div className={styles.wrapper}>
          <button
            type="button"
            aria-label="Importe"
            aria-required={required || undefined}
            className={[
              styles.input,
              styles.inputButton,
              focused && styles.inputFocused,
              !value && styles.inputPlaceholder,
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={openKeyboard}
          >
            {value || placeholder}
          </button>
          {required && (
            <input
              tabIndex={-1}
              aria-hidden="true"
              className={styles.validator}
              value={value}
              required
              readOnly
              onFocus={(event) => event.target.blur()}
            />
          )}
        </div>
        <AmountKeyboard
          open={keyboardOpen}
          value={value}
          onChange={onChange}
          onDone={closeKeyboard}
          onDismiss={closeKeyboard}
        />
      </>
    );
  }

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
          type="text"
          inputMode="decimal"
          enterKeyHint="next"
          autoComplete="off"
          placeholder={placeholder}
          required={required}
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
