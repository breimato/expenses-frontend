import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import styles from './UserSession.module.css';

function initialsFromName(displayName: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '?';
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
}

export function UserSession() {
  const navigate = useNavigate();
  const { user, clearSession } = useAuth();

  if (!user) {
    return null;
  }

  function onLogout() {
    clearSession();
    navigate('/login', { replace: true });
  }

  return (
    <div className={styles.session} aria-label="Sesión">
      <span className={styles.avatar} aria-hidden="true">
        {initialsFromName(user.displayName)}
      </span>
      <div className={styles.meta}>
        <span className={styles.name} title={user.displayName}>
          {user.displayName}
        </span>
        <button type="button" className={styles.logout} onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
