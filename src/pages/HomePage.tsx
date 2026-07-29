import { AnalyticsStrip } from '@/components/features/AnalyticsStrip';
import { QuickAddBar } from '@/components/features/QuickAddBar';
import { Amount } from '@/components/ui/Amount';
import { CategoryStripe } from '@/components/ui/CategoryStripe';
import { DataTable } from '@/components/ui/DataTable';
import { StateMessage } from '@/components/ui/StateMessage';
import { useCategories } from '@/hooks/useCategories';
import { useExpenses } from '@/hooks/useExpenses';
import { useProfile } from '@/hooks/useProfile';
import { formatDate } from '@/utils/format';
import styles from './Page.module.css';

export function HomePage() {
  const profile = useProfile();
  const { data, isLoading, isError } = useExpenses({ movementType: 'EXPENSE' });
  const { data: categoriesData } = useCategories();
  const expenses = (data?.expenses ?? []).slice(0, 10);
  const categories = categoriesData?.categories ?? [];

  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  return (
    <div className={styles.page}>
      <header>
        <h1>Hola{profile.data?.profile?.displayName ? `, ${profile.data.profile.displayName}` : ''}</h1>
        <p className={styles.lead}>Tu cuaderno de gastos de hoy</p>
      </header>

      <AnalyticsStrip />
      <QuickAddBar />

      <section className={styles.latestExpensesSection}>
        <div className={styles.header}>
          <h2>Últimos gastos</h2>
        </div>
        {isLoading && <StateMessage message="Cargando gastos…" />}
        {isError && <StateMessage message="No se pudieron cargar los gastos" variant="error" />}
        {!isLoading && !isError && (
          <DataTable
            headers={['Fecha', 'Concepto', 'Categoría', 'Importe']}
            alignRight={[3]}
            isEmpty={expenses.length === 0}
            emptyMessage="Aún no hay gastos registrados"
          >
            {expenses.map((expense) => {
              const category = expense.categoryId ? categoryMap.get(expense.categoryId) : undefined;
              return (
                <tr key={expense.id}>
                  <td>{formatDate(expense.expenseDate)}</td>
                  <td>{expense.description}</td>
                  <td>
                    <span className={styles.categoryCell}>
                      <CategoryStripe color={category?.color} />
                      {category?.name ?? '—'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Amount value={expense.amount} />
                  </td>
                </tr>
              );
            })}
          </DataTable>
        )}
      </section>
    </div>
  );
}
