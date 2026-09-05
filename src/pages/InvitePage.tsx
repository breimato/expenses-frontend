import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ErrorDialog } from '@/components/ui/ErrorDialog';
import { useAcceptAccountInvitation, useAccountInvitationPreview } from '@/hooks/useAccounts';
import { useErrorDialog } from '@/hooks/useErrorDialog';
import styles from './AuthPage.module.css';

export function InvitePage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const invitationQuery = useAccountInvitationPreview(token);
  const acceptInvitation = useAcceptAccountInvitation();
  const { errorMessage, isGuide, showError, clearError } = useErrorDialog();
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (invitationQuery.isError) {
      void showError(invitationQuery.error);
    }
  }, [invitationQuery.isError, invitationQuery.error, showError]);

  const invitation = invitationQuery.data?.invitation;
  const canAccept =
    invitation?.status === 'PENDING' && invitation.alreadyMember !== true && !accepted;

  const handleAccept = async () => {
    if (!token) {
      return;
    }
    try {
      await acceptInvitation.mutateAsync(token);
      setAccepted(true);
      navigate('/', { replace: true });
    } catch (error) {
      await showError(error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <div>
          <h1 className={styles.title}>Invitación</h1>
          <p className={styles.lead}>
            {invitationQuery.isLoading
              ? 'Cargando invitación…'
              : invitation?.accountName
                ? `Te han invitado a la cuenta «${invitation.accountName}»`
                : 'No se pudo cargar la invitación'}
          </p>
        </div>

        {invitation?.status === 'PENDING' && invitation.alreadyMember && (
          <p className={styles.lead}>Ya eres miembro de esta cuenta.</p>
        )}
        {invitation?.status === 'ACCEPTED' && (
          <p className={styles.lead}>Esta invitación ya fue aceptada.</p>
        )}
        {invitation?.status === 'EXPIRED' && (
          <p className={styles.lead}>Esta invitación ha caducado.</p>
        )}
        {invitation?.status === 'REVOKED' && (
          <p className={styles.lead}>Esta invitación fue revocada.</p>
        )}

        {canAccept && (
          <Button
            variant="primary"
            type="button"
            onClick={() => void handleAccept()}
            disabled={acceptInvitation.isPending}
          >
            {acceptInvitation.isPending ? 'Vinculando…' : 'Aceptar invitación'}
          </Button>
        )}

        <p className={styles.footer}>
          <Link to="/">Volver al inicio</Link>
        </p>
      </div>

      <ErrorDialog
        open={errorMessage !== null}
        message={errorMessage ?? ''}
        isGuide={isGuide}
        onClose={clearError}
      />
    </div>
  );
}
