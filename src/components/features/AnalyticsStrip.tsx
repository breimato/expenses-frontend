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
  const { averages, projections } = useAnalytics(referenceDate, {
    includeProjections: isCurrentMonth,
  });
  const profile = useProfile();

  const loading =
    averages.isLoading || (isCurrentMonth && (projections.isLoading || profile.isLoading));
  if (loading) {
    return <StateMessage message="Calculando resumen…" />;
  }

  if (averages.isError || (isCurrentMonth && projections.isError)) {
    return <StateMessage message="No se pudo cargar el resumen" variant="error" />;
  }

  const dailyAverage = averages.data?.analyticsAverages?.dailyAverage;
  const balanceAsOf = averages.data?.analyticsAverages?.balanceAsOf;
  const endBalance = projections.data?.analyticsProjections?.projectedEndOfMonthBalance;
  const daysRemaining = projections.data?.analyticsProjections?.daysRemainingInMonth;
  const balance = profile.data?.profile?.balance;

  if (!isCurrentMonth) {
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.metric} ${styles.balance}`}>
          <span className={styles.label}>Saldo al cierre</span>
          <span className={styles.balanceValue}>
            <Amount value={balanceAsOf} />
          </span>
          <span className={styles.sub}>a fin de mes</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Media diaria</span>
          <span className={styles.value}>
            <Amount value={dailyAverage} />
          </span>
          <span className={styles.sub}>gasto neto del mes</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.metric} ${styles.balance}`}>
        <span className={styles.label}>Balance</span>
        <span className={styles.balanceValue}>
          <Amount value={balance} />
        </span>
        <span className={styles.sub}>saldo actual</span>
      </div>

      <div className={styles.row}>
        <div className={styles.metric}>
          <span className={styles.label}>Estimación de dinero a final de mes</span>
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
          <span className={styles.sub}>gasto neto del mes</span>
        </div>
      </div>
    </div>
  );
}
