import styles from './CategoryStripe.module.css';

interface CategoryStripeProps {
  color?: string;
}

export function CategoryStripe({ color = '#6b7280' }: CategoryStripeProps) {
  return <span className={styles.stripe} style={{ backgroundColor: color }} aria-hidden />;
}

interface CategoryLabelProps {
  color?: string | null;
  icon?: string | null;
  name?: string | null;
  hideNameOnMobile?: boolean;
}

export function CategoryLabel({ color, icon, name, hideNameOnMobile = false }: CategoryLabelProps) {
  const label = name || '—';
  return (
    <span
      className={[styles.label, hideNameOnMobile ? styles.hideNameOnMobile : undefined]
        .filter(Boolean)
        .join(' ')}
      title={label}
    >
      <CategoryStripe color={color ?? undefined} />
      {icon ? (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className={styles.name}>{label}</span>
    </span>
  );
}
