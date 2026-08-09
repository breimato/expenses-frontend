import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ResponseError } from '@/api/generated';
import { postAuthRegisterApi } from '@/api/client';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import styles from './AuthPage.module.css';

export function RegisterPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const authV1Response = await postAuthRegisterApi.postAuthRegisterV1({
        postAuthRegisterV1Request: { email, password, displayName },
      });
      setSession(authV1Response);
      navigate('/', { replace: true });
    } catch (caught) {
      setError(await readErrorMessage(caught, 'No se pudo crear la cuenta'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <form className={styles.panel} onSubmit={onSubmit}>
        <div>
          <h1 className={styles.title}>Cuaderno</h1>
          <p className={styles.lead}>Crea tu cuenta</p>
        </div>
        <Field label="Nombre">
          <Input
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field label="Contraseña">
          <Input
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        {error ? <p className={styles.error}>{error}</p> : null}
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Creando…' : 'Crear cuenta'}
        </Button>
        <p className={styles.footer}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}

async function readErrorMessage(caught: unknown, fallback: string): Promise<string> {
  if (caught instanceof ResponseError) {
    try {
      const body = (await caught.response.json()) as { message?: string };
      if (body.message) {
        const parts = body.message.split(' | ');
        return parts[parts.length - 1] ?? body.message;
      }
    } catch {
      return fallback;
    }
  }
  return fallback;
}
