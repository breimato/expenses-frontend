import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './AmountInputAccessory.module.css';

type AmountInputAccessoryProps = {
  visible: boolean;
  onPlus: () => void;
  onMinus: () => void;
};

export function AmountInputAccessory({ visible, onPlus, onMinus }: AmountInputAccessoryProps) {
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const updatePosition = () => {
      const visualViewport = window.visualViewport;
      if (!visualViewport) {
        setBottomOffset(0);
        return;
      }
      const keyboardHeight = window.innerHeight - visualViewport.height - visualViewport.offsetTop;
      setBottomOffset(Math.max(0, keyboardHeight));
    };

    updatePosition();
    window.visualViewport?.addEventListener('resize', updatePosition);
    window.visualViewport?.addEventListener('scroll', updatePosition);
    return () => {
      window.visualViewport?.removeEventListener('resize', updatePosition);
      window.visualViewport?.removeEventListener('scroll', updatePosition);
    };
  }, [visible]);

  if (!visible || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className={styles.bar} style={{ bottom: `${bottomOffset}px` }} role="toolbar" aria-label="Operadores">
      <button
        type="button"
        className={styles.key}
        aria-label="Sumar"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onPlus}
      >
        +
      </button>
      <button
        type="button"
        className={styles.key}
        aria-label="Restar"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onMinus}
      >
        −
      </button>
    </div>,
    document.body,
  );
}
