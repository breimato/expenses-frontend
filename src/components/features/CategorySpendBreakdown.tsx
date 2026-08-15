import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Amount } from '@/components/ui/Amount';
import { CategoryLabel } from '@/components/ui/CategoryStripe';
import { StateMessage } from '@/components/ui/StateMessage';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useCategories } from '@/hooks/useCategories';
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

type ChartDatum = {
  name: string;
  total: number;
  color: string;
  percent: string;
};

export function CategorySpendBreakdown({ referenceDate }: { referenceDate?: string }) {
  const { categoryBreakdown } = useAnalytics(referenceDate);
  const { data: categoriesData } = useCategories({ movementType: 'EXPENSE' });
  const [viewMode, setViewMode] = useState<ViewMode>(readStoredView);

  const categoryIconMap = new Map(
    (categoriesData?.categories ?? []).map((category) => [category.id, category.icon]),
  );

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

  const chartData: ChartDatum[] = items.map((item) => ({
    name: item.categoryName ?? 'Sin categoría',
    total: Number.parseFloat(item.total ?? '0'),
    color: item.categoryColor ?? '#6B7280',
    percent: item.percent ?? '0',
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
                <CategoryLabel
                  color={item.categoryColor}
                  icon={categoryIconMap.get(item.categoryId)}
                  name={item.categoryName}
                />
              </span>
              <span className={styles.meta}>
                <Amount value={item.total} />
                <span className={styles.percent}>{item.percent}%</span>
              </span>
              <span className={styles.barTrack} aria-hidden>
                <span
                  className={styles.barFill}
                  style={{
                    width: `${Math.min(100, Number.parseFloat(item.percent ?? '0'))}%`,
                    backgroundColor: item.categoryColor ?? undefined,
                  }}
                />
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={100}
                paddingAngle={2}
                stroke="var(--color-surface)"
                strokeWidth={2}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, _name, item) => {
                  const datum = item?.payload as ChartDatum | undefined;
                  const label = datum ? `${datum.percent}%` : 'Total';
                  return [`${formatAmount(value as number | string)} €`, label];
                }}
                contentStyle={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className={styles.chartLegend}>
            {chartData.map((entry) => (
              <li key={entry.name} className={styles.legendItem}>
                <span className={styles.legendSwatch} style={{ backgroundColor: entry.color }} aria-hidden />
                <span className={styles.legendName}>{entry.name}</span>
                <span className={styles.legendMeta}>
                  {formatAmount(entry.total)} € · {entry.percent}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
