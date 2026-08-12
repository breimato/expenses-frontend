import { type InputHTMLAttributes, useEffect, useRef, useState } from 'react';
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

function useTouchDevice(): boolean {
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const noHover = window.matchMedia('(hover: none)').matches;
    setTouchDevice(coarsePointer || noHover);

    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const hoverQuery = window.matchMedia('(hover: none)');
    const update = () => setTouchDevice(coarseQuery.matches || hoverQuery.matches);
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
  onBlur,
  onFocus,
  onKeyDown,
  ...props
}: AmountInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const touchDevice = useTouchDevice();

  const handleStep = (direction: 1 | -1) => {
    onChange(stepAmount(value, direction));
    inputRef.current?.focus();
  };

  const handleOperator = (operator: '+' | '-') => {
    onChange(appendAmountOperator(value, operator));
    inputRef.current?.focus();
  };

  const openKeyboard = () => {
    setFocused(true);
    setKeyboardOpen(true);
    inputRef.current?.focus();
  };

  const closeKeyboard = () => {
    setKeyboardOpen(false);
    setFocused(false);
    onChange(evaluateAmountExpression(value));
    inputRef.current?.blur();
  };

  if (touchDevice) {
    return (
      <>
        <div className={styles.wrapper}>
          <input
            ref={inputRef}
            type="text"
            readOnly
            inputMode="none"
            enterKeyHint="done"
            autoComplete="off"
            placeholder={placeholder}
            aria-label="Importe"
            className={[styles.input, focused && styles.inputFocused, className].filter(Boolean).join(' ')}
            value={value}
            onFocus={(event) => {
              setFocused(true);
              setKeyboardOpen(true);
              onFocus?.(event);
            }}
            onClick={openKeyboard}
            {...props}
          />
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
