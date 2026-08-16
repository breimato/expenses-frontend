import { useEffect, useState } from 'react';
import { ResponseError } from '@/api/generated/runtime';
import { Amount } from '@/components/ui/Amount';
import { Field, Input } from '@/components/ui/Input';
import { StateMessage } from '@/components/ui/StateMessage';
import { usePeriodAverage } from '@/hooks/usePeriodAverage';
import { monthBounds } from '@/utils/month';
import styles from './PeriodAveragePanel.module.css';

type PeriodAveragePanelProps = {
  monthValue: string;
  /** When false, skips the API call (e.g. collapsed disclosure). */
  enabled?: boolean;
};

function periodAverageErrorMessage(error: unknown): string {
  if (error instanceof ResponseError && error.response.status === 404) {
    return 'El backend no tiene este endpoint. Reinicia el servidor de expenses.';
  }
  return 'No se pudo calcular la media del periodo';
}

export function PeriodAveragePanel({ monthValue, enabled = true }: PeriodAveragePanelProps) {
  const defaults = monthBounds(monthValue);
  const [dateFrom, setDateFrom] = useState(defaults.from);
  const [dateTo, setDateTo] = useState(defaults.to);

  useEffect(() => {
    const nextBounds = monthBounds(monthValue);
    setDateFrom(nextBounds.from);
    setDateTo(nextBounds.to);
  }, [monthValue]);

  const periodAverage = usePeriodAverage(dateFrom, dateTo, enabled);
  const result = periodAverage.data?.analyticsPeriodAverage;
  const rangeInvalid = dateFrom > dateTo;

  return (
    <div className={styles.panel}>
      <div className={styles.filters}>
        <Field label="Desde">
          <Input
            type="date"
            value={dateFrom}
            max={dateTo}
            onChange={(event) => setDateFrom(event.target.value)}
          />
        </Field>
        <Field label="Hasta">
          <Input
            type="date"
            value={dateTo}
            min={dateFrom}
            onChange={(event) => setDateTo(event.target.value)}
          />
        </Field>
      </div>

      {rangeInvalid && <StateMessage message="La fecha de inicio no puede ser posterior a la de fin" variant="error" />}
      {!rangeInvalid && enabled && periodAverage.isLoading && <StateMessage message="Calculando media…" />}
      {!rangeInvalid && enabled && periodAverage.isError && (
        <StateMessage message={periodAverageErrorMessage(periodAverage.error)} variant="error" />
      )}
      {!rangeInvalid && enabled && !periodAverage.isLoading && !periodAverage.isError && result && (
        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.label}>Media diaria</span>
            <span className={styles.value}>
              <Amount value={result.dailyAverage} />
            </span>
          </div>
          <div className={styles.metric}>
            <span className={styles.label}>Total neto</span>
            <span className={styles.value}>
              <Amount value={result.totalNetSpending} />
            </span>
          </div>
          <div className={styles.metric}>
            <span className={styles.label}>Días</span>
            <span className={styles.value}>{result.daysInPeriod ?? '—'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
