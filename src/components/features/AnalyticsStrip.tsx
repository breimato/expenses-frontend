import { Amount } from '@/components/ui/Amount';
import { StateMessage } from '@/components/ui/StateMessage';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useProfile } from '@/hooks/useProfile';
import styles from './AnalyticsStrip.module.css';

type AnalyticsStripProps = {
  referenceDate: string;
  isCurrentMonth: boolean;
};

export function AnalyticsStrip({ referenceDate, isCurrentMonth }: AnalyticsStripProps) {
  const { averages, projections } = useAnalytics(referenceDate);
  const profile = useProfile();

  const loading = averages.isLoading || projections.isLoading || (isCurrentMonth && profile.isLoading);
  if (loading) {
    return <StateMessage message="Calculando resumen…" />;
  }

  if (averages.isError || projections.isError) {
    return <StateMessage message="No se pudo cargar el resumen" variant="error" />;
  }

  const dailyAverage = averages.data?.analyticsAverages?.dailyAverage;
  const endBalance = projections.data?.analyticsProjections?.projectedEndOfMonthBalance;
  const daysRemaining = isCurrentMonth
    ? projections.data?.analyticsProjections?.daysRemainingInMonth
    : undefined;
  const balance = profile.data?.profile?.balance;

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.metric} ${styles.balance}`}>
        <span className={styles.label}>{isCurrentMonth ? 'Balance' : 'Saldo proyectado'}</span>
        <span className={styles.balanceValue}>
          <Amount value={isCurrentMonth ? balance : endBalance} />
        </span>
        <span className={styles.sub}>{isCurrentMonth ? 'saldo actual' : 'a fin de mes'}</span>
      </div>

      <div className={styles.row}>
        <div className={styles.metric}>
          <span className={styles.label}>
            {isCurrentMonth ? 'Estimación de dinero a final de mes' : 'Estimación a fin de mes'}
          </span>
          <span className={styles.value}>
            <Amount value={endBalance} />
          </span>
          {daysRemaining !== undefined && (
            <span className={styles.sub}>{daysRemaining} días restantes</span>
          )}
          {!isCurrentMonth && <span className={styles.sub}>según gasto del mes</span>}
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Media diaria</span>
          <span className={styles.value}>
            <Amount value={dailyAverage} />
          </span>
          <span className={styles.sub}>gasto neto del mes</span>
        </div>
      </div>
    </div>
  );
}
