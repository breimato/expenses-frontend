import type { ReactNode } from 'react';
import type { CategoryV1, ExpenseV1 } from '@/api/generated';
import { Amount } from '@/components/ui/Amount';
import { CategoryLabel } from '@/components/ui/CategoryStripe';
import { formatDate, toLocalIsoDate } from '@/utils/format';
import { groupExpensesByDay } from '@/utils/groupExpensesByDay';
import styles from './ExpensesByDayList.module.css';

interface ExpensesByDayListProps {
  expenses: ExpenseV1[];
  categoryMap: Map<number | undefined, CategoryV1>;
  emptyMessage?: string;
  showMovementType?: boolean;
  renderActions?: (expense: ExpenseV1) => ReactNode;
}

function formatDayHeading(dateKey: string): string {
  const today = toLocalIsoDate(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = toLocalIsoDate(yesterdayDate);

  if (dateKey === today) {
    return 'Hoy';
  }
  if (dateKey === yesterday) {
    return 'Ayer';
  }
  return formatDate(dateKey);
}

function movementTypeLabel(movementType: ExpenseV1['movementType']): string {
  return movementType === 'INCOME' ? 'Ingreso' : 'Gasto';
}

export function ExpensesByDayList({
  expenses,
  categoryMap,
  emptyMessage = 'No hay gastos en este mes',
  showMovementType = false,
  renderActions,
}: ExpensesByDayListProps) {
  const dayGroups = groupExpensesByDay(expenses);

  if (dayGroups.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.list}>
      {dayGroups.map((dayGroup) => (
        <section key={dayGroup.dateKey} className={styles.daySection}>
          <header
            className={[styles.dayHeader, showMovementType ? styles.dayHeaderWithType : undefined]
              .filter(Boolean)
              .join(' ')}
          >
            <h3 className={styles.dayLabel}>{formatDayHeading(dayGroup.dateKey)}</h3>
            <Amount value={dayGroup.total} className={styles.dayTotal} />
          </header>
          <ul className={styles.rows}>
            {dayGroup.expenses.map((expense) => {
              const category = expense.categoryId ? categoryMap.get(expense.categoryId) : undefined;
              return (
                <li
                  key={expense.id}
                  className={[styles.row, showMovementType ? styles.rowWithType : undefined]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {showMovementType && (
                    <span className={styles.movementType}>{movementTypeLabel(expense.movementType)}</span>
                  )}
                  <span className={styles.description}>{expense.description}</span>
                  <span className={styles.category}>
                    <CategoryLabel
                      color={category?.color}
                      icon={category?.icon}
                      name={category?.name}
                      hideNameOnMobile
                    />
                  </span>
                  <Amount value={expense.amount} className={styles.rowAmount} />
                  {renderActions ? <div className={styles.rowActions}>{renderActions(expense)}</div> : null}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
