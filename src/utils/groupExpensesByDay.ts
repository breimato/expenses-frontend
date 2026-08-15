import type { ExpenseV1 } from '@/api/generated';
import { toLocalIsoDate } from '@/utils/format';

export interface ExpenseDayGroup {
  dateKey: string;
  expenses: ExpenseV1[];
  total: number;
}

function expenseDateKey(expenseDate: string | Date | undefined): string | null {
  if (!expenseDate) {
    return null;
  }
  return expenseDate instanceof Date ? toLocalIsoDate(expenseDate) : expenseDate.slice(0, 10);
}

function parseAmount(amount: string | undefined): number {
  if (!amount) {
    return 0;
  }
  const numeric = Number.parseFloat(amount);
  return Number.isNaN(numeric) ? 0 : numeric;
}

/** Groups expenses by calendar day, newest days first. */
export function groupExpensesByDay(expenses: ExpenseV1[]): ExpenseDayGroup[] {
  const groups = new Map<string, ExpenseV1[]>();

  for (const expense of expenses) {
    const dateKey = expenseDateKey(expense.expenseDate);
    if (!dateKey) {
      continue;
    }
    const bucket = groups.get(dateKey);
    if (bucket) {
      bucket.push(expense);
    } else {
      groups.set(dateKey, [expense]);
    }
  }

  return [...groups.entries()]
    .sort(([dateKeyA], [dateKeyB]) => dateKeyB.localeCompare(dateKeyA))
    .map(([dateKey, dayExpenses]) => ({
      dateKey,
      expenses: dayExpenses,
      total: dayExpenses.reduce((sum, expense) => sum + parseAmount(expense.amount), 0),
    }));
}
