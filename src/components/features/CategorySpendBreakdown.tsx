import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Amount } from '@/components/ui/Amount';
import { CategoryStripe } from '@/components/ui/CategoryStripe';
import { StateMessage } from '@/components/ui/StateMessage';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatAmount } from '@/utils/format';
import styles from './CategorySpendBreakdown.module.css';

const VIEW_STORAGE_KEY = 'category-spend-view';
type ViewMode = 'list' | 'chart';

function readStoredView(): ViewMode {
  try {
    const stored = sessionStorage.getItem(VIEW_STORAGE_KEY);
    return stored === 'chart' ? 'chart' : 'list';
  } catch {
    return 'list';
  }
}

export function CategorySpendBreakdown() {
  const { categoryBreakdown } = useAnalytics();
  const [viewMode, setViewMode] = useState<ViewMode>(readStoredView);

  const setView = (next: ViewMode) => {
    setViewMode(next);
    try {
      sessionStorage.setItem(VIEW_STORAGE_KEY, next);
    } catch {
      // Ignore storage errors (private mode, quota, etc.).
    }
  };

  if (categoryBreakdown.isLoading) {
    return <StateMessage message="Calculando gastos por categoría…" />;
  }

  if (categoryBreakdown.isError) {
    return <StateMessage message="No se pudo cargar el desglose por categoría" variant="error" />;
  }

  const breakdown = categoryBreakdown.data?.analyticsCategoryBreakdown;
  const items = breakdown?.items ?? [];
  const totalSpent = breakdown?.totalSpent;

  if (items.length === 0) {
    return (
      <section className={styles.section} aria-labelledby="category-spend-heading">
        <header className={styles.header}>
          <h2 id="category-spend-heading">Gastos por categoría</h2>
        </header>
        <StateMessage message="Aún no hay gastos este mes" />
      </section>
    );
  }

  const chartData = items.map((item) => ({
    name: item.categoryName,
    total: Number.parseFloat(item.total),
    color: item.categoryColor,
  }));

  return (
    <section className={styles.section} aria-labelledby="category-spend-heading">
      <header className={styles.header}>
        <div>
          <h2 id="category-spend-heading">Gastos por categoría</h2>
          {totalSpent !== undefined && (
            <p className={styles.total}>
              Total del mes: <Amount value={totalSpent} />
            </p>
          )}
        </div>
        <div className={styles.toggle} role="group" aria-label="Vista del desglose">
          <button
            type="button"
            className={viewMode === 'list' ? styles.toggleActive : styles.toggleBtn}
            aria-pressed={viewMode === 'list'}
            onClick={() => setView('list')}
          >
            Lista
          </button>
          <button
            type="button"
            className={viewMode === 'chart' ? styles.toggleActive : styles.toggleBtn}
            aria-pressed={viewMode === 'chart'}
            onClick={() => setView('chart')}
          >
            Gráfico
          </button>
        </div>
      </header>

      {viewMode === 'list' ? (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.categoryId} className={styles.row}>
              <span className={styles.category}>
                <CategoryStripe color={item.categoryColor} />
                <span className={styles.name}>{item.categoryName}</span>
              </span>
              <span className={styles.meta}>
                <Amount value={item.total} />
                <span className={styles.percent}>{item.percent}%</span>
              </span>
              <span
                className={styles.barTrack}
                aria-hidden
              >
                <span
                  className={styles.barFill}
                  style={{
                    width: `${Math.min(100, Number.parseFloat(item.percent))}%`,
                    backgroundColor: item.categoryColor,
                  }}
                />
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={Math.max(220, items.length * 44)}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
              <XAxis
                type="number"
                tickFormatter={(value: number) => `${formatAmount(value)} €`}
                stroke="var(--color-text-muted)"
                fontSize={12}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={96}
                stroke="var(--color-text-muted)"
                fontSize={12}
              />
              <Tooltip
                formatter={(value) => [`${formatAmount(value as number | string)} €`, 'Total']}
                contentStyle={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              />
              <Bar dataKey="total" radius={[0, 4, 4, 0]} maxBarSize={28}>
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
