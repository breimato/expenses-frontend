import { Amount } from '@/components/ui/Amount';
import { StateMessage } from '@/components/ui/StateMessage';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useProfile } from '@/hooks/useProfile';
import styles from './AnalyticsStrip.module.css';

export function AnalyticsStrip() {
  const { averages, projections } = useAnalytics();
  const profile = useProfile();

  if (averages.isLoading || projections.isLoading || profile.isLoading) {
    return <StateMessage message="Calculando resumen…" />;
  }

  if (averages.isError || projections.isError) {
    return <StateMessage message="No se pudo cargar el resumen" variant="error" />;
  }

  const dailyAverage = averages.data?.analyticsAverages?.dailyAverage;
  const monthlyAverage = averages.data?.analyticsAverages?.monthlyAverage;
  const yearlyAverage = averages.data?.analyticsAverages?.yearlyAverage;
  const endBalance = projections.data?.analyticsProjections?.projectedEndOfMonthBalance;
  const daysRemaining = projections.data?.analyticsProjections?.daysRemainingInMonth;
  const balance = profile.data?.profile?.balance;

  return (
    <div className={styles.wrapper}>
      <div className={styles.strip}>
        <div className={styles.metric}>
          <span className={styles.label}>Balance</span>
          <span className={styles.value}>
            <Amount value={balance} />
          </span>
          <span className={styles.sub}>saldo actual</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Fin de mes (est.)</span>
          <span className={styles.value}>
            <Amount value={endBalance} />
          </span>
          {daysRemaining !== undefined && (
            <span className={styles.sub}>{daysRemaining} días restantes</span>
          )}
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Media diaria</span>
          <span className={styles.value}>
            <Amount value={dailyAverage} />
          </span>
          <span className={styles.sub}>desde el 1 del mes</span>
        </div>
      </div>
      <div className={`${styles.strip} ${styles.stripSecondary}`}>
        <div className={styles.metric}>
          <span className={styles.label}>Media mensual</span>
          <span className={styles.value}>
            <Amount value={monthlyAverage} />
          </span>
          <span className={styles.sub}>promedio últimos 12 meses</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Media anual</span>
          <span className={styles.value}>
            <Amount value={yearlyAverage} />
          </span>
          <span className={styles.sub}>promedio mensual del año en curso</span>
        </div>
      </div>
    </div>
  );
}
