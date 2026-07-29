import { useState } from 'react';
import styles from './EmojiPicker.module.css';

const EMOJI_GROUPS: { label: string; emojis: string[] }[] = [
  {
    label: 'Comida',
    emojis: ['🍔', '🍕', '🍞', '🥗', '🍺', '☕', '🍷', '🥤', '🍽️', '🛒'],
  },
  {
    label: 'Transporte',
    emojis: ['🚗', '⛽', '🚌', '🚇', '✈️', '🚲', '🛵', '🅿️', '🚕', '🛞'],
  },
  {
    label: 'Hogar',
    emojis: ['🏠', '💡', '🔧', '🧹', '🛋️', '🪴', '🚿', '📦', '🗑️', '🔑'],
  },
  {
    label: 'Salud',
    emojis: ['💊', '🏥', '🦷', '👓', '🩺', '🏋️', '🧘', '💆', '🩹', '🧴'],
  },
  {
    label: 'Ocio',
    emojis: ['🎬', '🎮', '📚', '🎵', '🎨', '🎭', '🏖️', '⚽', '🎳', '🎤'],
  },
  {
    label: 'Finanzas',
    emojis: ['💰', '💳', '🏦', '📈', '📉', '💵', '🧾', '💸', '🪙', '📊'],
  },
  {
    label: 'Trabajo',
    emojis: ['💻', '📱', '🖨️', '📎', '✏️', '📐', '🗂️', '📅', '🎓', '👔'],
  },
  {
    label: 'Otros',
    emojis: ['🎁', '❤️', '🐾', '👶', '👗', '💇', '🧸', '📬', '🔔', '⭐'],
  },
];

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
}

export function EmojiPicker({ value, onChange }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = search
    ? EMOJI_GROUPS.map((g) => ({
        ...g,
        emojis: g.emojis.filter(() => g.label.toLowerCase().includes(search.toLowerCase())),
      })).filter((g) => g.emojis.length > 0)
    : EMOJI_GROUPS;

  const select = (emoji: string) => {
    onChange(emoji);
    setOpen(false);
    setSearch('');
  };

  const clear = () => {
    onChange('');
    setOpen(false);
    setSearch('');
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {value ? (
          <span className={styles.preview}>{value}</span>
        ) : (
          <span className={styles.placeholder}>Elegir icono…</span>
        )}
      </button>

      {open && (
        <div className={styles.dropdown} role="dialog" aria-label="Selector de icono">
          <input
            className={styles.search}
            type="text"
            placeholder="Buscar categoría…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />

          <div className={styles.grid}>
            {filtered.map((group) => (
              <div key={group.label}>
                <span className={styles.groupLabel}>{group.label}</span>
                <div className={styles.emojis}>
                  {group.emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className={[styles.emoji, value === emoji && styles.selected]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => select(emoji)}
                      aria-label={emoji}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {value && (
            <button type="button" className={styles.clearBtn} onClick={clear}>
              Quitar icono
            </button>
          )}
        </div>
      )}
    </div>
  );
}
