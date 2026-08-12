const amountFormatter = new Intl.NumberFormat('es-ES', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseLocalIsoDate(isoDate: string): Date {
  const [year, month, day] = isoDate.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day);
}

import { evaluateAmountExpression } from './amountInput';

export function toApiAmount(value: string): string {
  return evaluateAmountExpression(value).replace(',', '.');
}

export function formatAmount(value: string | number | undefined | null): string {
  if (value === undefined || value === null || value === '') {
    return '—';
  }
  const numeric = typeof value === 'string' ? Number.parseFloat(value) : value;
  if (Number.isNaN(numeric)) {
    return String(value);
  }
  return amountFormatter.format(numeric);
}

export function formatDate(value: string | Date | undefined | null): string {
  if (!value) {
    return '—';
  }
  const isoDate = value instanceof Date ? toLocalIsoDate(value) : value.slice(0, 10);
  const date = parseLocalIsoDate(isoDate);
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function toInputDate(value: string | Date | undefined | null): string {
  if (!value) {
    return '';
  }
  if (value instanceof Date) {
    return toLocalIsoDate(value);
  }
  return value.slice(0, 10);
}

export function toApiDate(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00`);
}
