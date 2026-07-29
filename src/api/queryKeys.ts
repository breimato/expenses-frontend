export const queryKeys = {
  categories: ['categories'] as const,
  expenses: (filters?: object) => ['expenses', filters] as const,
  recurringTemplates: (filters?: object) => ['recurringTemplates', filters] as const,
  profile: ['profile'] as const,
  analytics: (date: string) => ['analytics', date] as const,
};
