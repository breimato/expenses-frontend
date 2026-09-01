import type { MovementTypeV1 } from '@/api/generated';

export type MovementFilter = '' | 'EXPENSE' | 'INCOME' | 'TRANSFER';

export const MOVEMENT_FILTER_OPTIONS: { value: MovementFilter; label: string }[] = [
  { value: '', label: 'Todos' },
  { value: 'EXPENSE', label: 'Gasto' },
  { value: 'INCOME', label: 'Ingreso' },
  { value: 'TRANSFER', label: 'Transferencia' },
];

export function isIncomeLike(movementType?: MovementTypeV1): boolean {
  return movementType === 'INCOME' || movementType === 'TRANSFER_IN';
}

export function isExpenseLike(movementType?: MovementTypeV1): boolean {
  return movementType === 'EXPENSE' || movementType === 'TRANSFER_OUT';
}

export function isTransfer(movementType?: MovementTypeV1): boolean {
  return movementType === 'TRANSFER_IN' || movementType === 'TRANSFER_OUT';
}

/** User-facing movement label in lists and filters. */
export function movementTypeLabel(movementType?: MovementTypeV1): string {
  if (isTransfer(movementType)) {
    return 'Transferencia';
  }
  if (movementType === 'INCOME') {
    return 'Ingreso';
  }
  return 'Gasto';
}

/** Movement types available when creating manual movements (not transfers). */
export const MANUAL_MOVEMENT_TYPES: MovementTypeV1[] = ['EXPENSE', 'INCOME'];

export function manualMovementTypeLabel(movementType: MovementTypeV1): string {
  return movementType === 'INCOME' ? 'Ingreso' : 'Gasto';
}

export function matchesMovementFilter(
  movementType: MovementTypeV1 | undefined,
  filter: MovementFilter,
): boolean {
  if (!filter) {
    return true;
  }
  if (filter === 'TRANSFER') {
    return isTransfer(movementType);
  }
  return movementType === filter;
}

/** How the movement affects daily net spending totals. */
export function movementNetSpendingDelta(amount: number, movementType?: MovementTypeV1): number {
  return isIncomeLike(movementType) ? -amount : amount;
}
