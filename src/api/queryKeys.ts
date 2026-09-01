export const queryKeys = {
  accounts: (userId: number) => ['accounts', userId] as const,
  account: (userId: number, accountId: number) => ['account', userId, accountId] as const,
  categories: (userId: number, accountId: number, filters?: object) =>
    ['categories', userId, accountId, filters] as const,
  expenses: (userId: number, accountId: number, filters?: object) =>
    ['expenses', userId, accountId, filters] as const,
  recurringTemplates: (userId: number, accountId: number, filters?: object) =>
    ['recurringTemplates', userId, accountId, filters] as const,
  analytics: (userId: number, accountId: number, date: string) =>
    ['analytics', userId, accountId, date] as const,
  periodAverage: (userId: number, accountId: number, dateFrom: string, dateTo: string) =>
    ['analytics', userId, accountId, 'period-average', dateFrom, dateTo] as const,
};
