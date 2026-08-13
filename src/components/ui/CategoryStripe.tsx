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
}

export function CategoryLabel({ color, icon, name }: CategoryLabelProps) {
  return (
    <span className={styles.label}>
      <CategoryStripe color={color ?? undefined} />
      {icon ? (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className={styles.name}>{name || '—'}</span>
    </span>
  );
}
