import styles from './StateMessage.module.css';

interface StateMessageProps {
  message: string;
  variant?: 'default' | 'error';
}

export function StateMessage({ message, variant = 'default' }: StateMessageProps) {
  return (
    <p className={[styles.state, variant === 'error' && styles.error].filter(Boolean).join(' ')}>
      {message}
    </p>
  );
}
