import { useState } from 'react';
import styles from './ColorPicker.module.css';

const PALETTE = [
  '#C45C3E', '#E07A5F', '#D4715A', '#B5651D',
  '#8B6914', '#C4A035', '#6B8E23', '#2D6A4F',
  '#2D4A3E', '#4A7261', '#5C7A6B', '#3A86A8',
  '#4A90D9', '#6366F1', '#7C3AED', '#9333EA',
  '#C026D3', '#DB2777', '#E11D48', '#9B3B30',
  '#6B7280', '#4B5563', '#374151', '#1F2937',
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.swatches}>
        {PALETTE.map((color) => (
          <button
            key={color}
            type="button"
            className={[styles.swatch, value === color && styles.selected]
              .filter(Boolean)
              .join(' ')}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            aria-label={color}
            aria-pressed={value === color}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.preview}>
          <span
            className={styles.previewDot}
            style={{ backgroundColor: value }}
          />
          <span className={styles.previewHex}>{value}</span>
        </div>
        <button
          type="button"
          className={styles.customBtn}
          onClick={() => setShowCustom(!showCustom)}
        >
          {showCustom ? 'Ocultar' : 'Color personalizado'}
        </button>
      </div>
      {showCustom && (
        <input
          type="color"
          className={styles.nativeInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
