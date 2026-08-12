const inputNumberFormat = new Intl.NumberFormat('es-ES', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  useGrouping: false,
});

export function sanitizeAmountTyping(value: string): string {
  return value.replace(/[^\d.,+\-]/g, '');
}

export function formatAmountInputNumber(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return inputNumberFormat.format(rounded);
}

export function evaluateAmountExpression(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  const compact = trimmed.replace(/\s/g, '');
  const hasOperator = /[+\-]/.test(compact.slice(1));

  if (!hasOperator) {
    const numeric = Number.parseFloat(compact.replace(',', '.'));
    if (Number.isNaN(numeric)) {
      return sanitizeAmountTyping(trimmed);
    }
    return formatAmountInputNumber(Math.max(0, numeric));
  }

  const tokens = compact.replace(/,/g, '.').match(/[+\-]?[\d.]+/g);
  if (!tokens?.length) {
    return '';
  }

  let total = 0;
  for (const token of tokens) {
    const numeric = Number.parseFloat(token);
    if (Number.isNaN(numeric)) {
      continue;
    }
    total += numeric;
  }

  return formatAmountInputNumber(Math.max(0, total));
}

export function getAmountStep(value: string): number {
  const trimmed = value.trim();
  if (/[.,]\d*$/.test(trimmed) && !/[+\-]$/.test(trimmed)) {
    return 0.01;
  }
  return 1;
}

export function stepAmount(value: string, direction: 1 | -1): string {
  const step = getAmountStep(value);
  const currentText = evaluateAmountExpression(value);
  const current = Number.parseFloat(currentText.replace(',', '.')) || 0;
  const next = Math.max(0, Math.round((current + direction * step) * 100) / 100);
  return formatAmountInputNumber(next);
}

export function appendAmountOperator(value: string, operator: '+' | '-'): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return operator === '-' ? '-' : '';
  }
  if (/[+\-]$/.test(trimmed)) {
    return trimmed.slice(0, -1) + operator;
  }
  return `${trimmed}${operator}`;
}
