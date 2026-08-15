import { useMemo, useState } from 'react';
import { AnalyticsStrip } from '@/components/features/AnalyticsStrip';
import { CategorySpendBreakdown } from '@/components/features/CategorySpendBreakdown';
import { ExpensesByDayList } from '@/components/features/ExpensesByDayList';
import { PeriodAveragePanel } from '@/components/features/PeriodAveragePanel';
import { QuickAddBar } from '@/components/features/QuickAddBar';
import { Button } from '@/components/ui/Button';
import { StateMessage } from '@/components/ui/StateMessage';
import { todayIsoDate } from '@/api/client';
import { useCategories } from '@/hooks/useCategories';
import { useExpenses } from '@/hooks/useExpenses';
import { useProfile } from '@/hooks/useProfile';
import {
  expenseInMonth,
  formatMonthLabel,
  isCurrentMonth as checkIsCurrentMonth,
  referenceDateForMonth,
  shiftMonth,
  toMonthValue,
} from '@/utils/month';
import styles from './Page.module.css';

export function HomePage() {
  const [monthValue, setMonthValue] = useState(() => toMonthValue(todayIsoDate()));
  const referenceDate = referenceDateForMonth(monthValue);
  const currentMonth = checkIsCurrentMonth(monthValue);

  const profile = useProfile();
  const { data, isLoading, isError } = useExpenses({ movementType: 'EXPENSE' });
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.categories ?? [];
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  const expenses = useMemo(() => {
    return (data?.expenses ?? []).filter((expense) => expenseInMonth(expense.expenseDate, monthValue));
  }, [data?.expenses, monthValue]);

  const canGoNext = monthValue < toMonthValue(todayIsoDate());

  return (
    <div className={styles.page}>
      <header className={`${styles.homeIntro} ${styles.homeIntroOrder}`}>
        <h1>Hola{profile.data?.profile?.displayName ? `, ${profile.data.profile.displayName}` : ''}</h1>
        <p className={styles.lead}>
          {currentMonth ? 'Tu cuaderno de gastos de este mes' : `Cuaderno de ${formatMonthLabel(monthValue)}`}
        </p>
        <div className={styles.monthSwitcher}>
          <Button
            size="small"
            variant="ghost"
            type="button"
            onClick={() => setMonthValue((value) => shiftMonth(value, -1))}
          >
            ←
          </Button>
          <span className={styles.monthLabel}>{formatMonthLabel(monthValue)}</span>
          <Button
            size="small"
            variant="ghost"
            type="button"
            disabled={!canGoNext}
            onClick={() => setMonthValue((value) => shiftMonth(value, 1))}
          >
            →
          </Button>
        </div>
      </header>

      <div className={styles.homeAnalyticsOrder}>
        <AnalyticsStrip
          referenceDate={referenceDate}
          isCurrentMonth={currentMonth}
        />
      </div>
      <div className={styles.homePeriodAverageOrder}>
        <PeriodAveragePanel monthValue={monthValue} />
      </div>
      <div className={styles.homeBreakdownOrder}>
        <CategorySpendBreakdown referenceDate={referenceDate} />
      </div>
      {currentMonth && (
        <div className={styles.homeQuickAddOrder}>
          <QuickAddBar />
        </div>
      )}

      <section className={`${styles.latestExpensesSection} ${styles.homeLatestOrder}`}>
        <div className={styles.header}>
          <h2>Gastos por día</h2>
        </div>
        {isLoading && <StateMessage message="Cargando gastos…" />}
        {isError && <StateMessage message="No se pudieron cargar los gastos" variant="error" />}
        {!isLoading && !isError && (
          <ExpensesByDayList expenses={expenses} categoryMap={categoryMap} />
        )}
      </section>
    </div>
  );
}
