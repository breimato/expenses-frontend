import { type FormEvent, useEffect, useState } from 'react';
import { ThemeSelect } from '@/components/features/ThemeSelect';
import { Button } from '@/components/ui/Button';
import { ErrorDialog } from '@/components/ui/ErrorDialog';
import { Field, Input } from '@/components/ui/Input';
import { StateMessage } from '@/components/ui/StateMessage';
import { useErrorDialog } from '@/hooks/useErrorDialog';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import styles from './Page.module.css';

export function SettingsPage() {
  const { data, isLoading, isError } = useProfile();
  const updateProfile = useUpdateProfile();
  const { errorMessage, isGuide, showError, clearError } = useErrorDialog();
  const [displayName, setDisplayName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data?.profile) {
      setDisplayName(data.profile.displayName ?? '');
    }
  }, [data]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateProfile.mutateAsync({ displayName });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      await showError(error);
    }
  };

  if (isLoading) {
    return <StateMessage message="Cargando perfil…" />;
  }

  if (isError) {
    return <StateMessage message="Error al cargar el perfil" variant="error" />;
  }

  return (
    <div className={styles.page}>
      <header>
        <h1>Ajustes</h1>
        <p className={styles.lead}>Tu perfil y apariencia</p>
      </header>

      <section className={styles.panel}>
        <ThemeSelect />
      </section>

      <form
        onSubmit={handleSubmit}
        className={styles.panel}
      >
        <Field label="Nombre">
          <Input
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Field>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <Button variant="primary" type="submit" disabled={updateProfile.isPending}>
            Guardar
          </Button>
          {saved && <span style={{ fontSize: '0.875rem', color: 'var(--color-sage)' }}>Guardado</span>}
        </div>
      </form>

      <ErrorDialog
        open={errorMessage !== null}
        message={errorMessage ?? ''}
        isGuide={isGuide}
        onClose={clearError}
      />
    </div>
  );
}
