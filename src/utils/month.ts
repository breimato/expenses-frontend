import { todayIsoDate } from '@/api/client';
import { toLocalIsoDate } from '@/utils/format';

export function toMonthValue(isoDate: string): string {
  return isoDate.slice(0, 7);
}

export function shiftMonth(monthValue: string, delta: number): string {
  const [year, month] = monthValue.split('-').map(Number);
  const date = new Date(year, month - 1 + delta, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function monthBounds(monthValue: string): { from: string; to: string } {
  const [year, month] = monthValue.split('-').map(Number);
  const from = toLocalIsoDate(new Date(year, month - 1, 1));
  const lastDay = toLocalIsoDate(new Date(year, month, 0));
  const today = todayIsoDate();
  return { from, to: lastDay > today ? today : lastDay };
}

export function daysRemainingInMonthAfter(isoDate: string): number {
  const [year, month, day] = isoDate.split('-').map(Number);
  const lastDay = new Date(year, month, 0).getDate();
  return Math.max(0, lastDay - day);
}

export function referenceDateForMonth(monthValue: string): string {
  return monthBounds(monthValue).to;
}

export function isCurrentMonth(monthValue: string): boolean {
  return monthValue === toMonthValue(todayIsoDate());
}

export function formatMonthLabel(monthValue: string): string {
  const [year, month] = monthValue.split('-').map(Number);
  const date = new Date(year, month - 1, 1);
  const label = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function expenseInMonth(expenseDate: string | Date | undefined, monthValue: string): boolean {
  if (!expenseDate) {
    return false;
  }
  const iso = expenseDate instanceof Date ? toLocalIsoDate(expenseDate) : expenseDate.slice(0, 10);
  return iso.startsWith(monthValue);
}
