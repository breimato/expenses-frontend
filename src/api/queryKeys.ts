export const queryKeys = {
  categories: (userId: number) => ['categories', userId] as const,
  expenses: (userId: number, filters?: object) => ['expenses', userId, filters] as const,
  recurringTemplates: (userId: number, filters?: object) =>
    ['recurringTemplates', userId, filters] as const,
  profile: (userId: number) => ['profile', userId] as const,
  analytics: (userId: number, date: string) => ['analytics', userId, date] as const,
  periodAverage: (userId: number, dateFrom: string, dateTo: string) =>
    ['analytics', userId, 'period-average', dateFrom, dateTo] as const,
};
