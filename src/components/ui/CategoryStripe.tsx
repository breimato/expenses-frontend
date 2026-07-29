import styles from './CategoryStripe.module.css';

interface CategoryStripeProps {
  color?: string;
}

export function CategoryStripe({ color = '#6b7280' }: CategoryStripeProps) {
  return <span className={styles.stripe} style={{ backgroundColor: color }} aria-hidden />;
}
