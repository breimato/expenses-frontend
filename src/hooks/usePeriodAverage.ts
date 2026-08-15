import { useQuery } from '@tanstack/react-query';
import { getAnalyticsPeriodAverageApi } from '@/api/client';
import { queryKeys } from '@/api/queryKeys';
import { useAuth } from '@/context/AuthContext';

export function usePeriodAverage(dateFrom: string, dateTo: string) {
  const { user } = useAuth();
  const userId = user?.id;
  const rangeValid = Boolean(dateFrom && dateTo && dateFrom <= dateTo);

  return useQuery({
    queryKey: queryKeys.periodAverage(userId ?? 0, dateFrom, dateTo),
    queryFn: () =>
      getAnalyticsPeriodAverageApi.getAnalyticsPeriodAverageV1({
        getAnalyticsPeriodAverageV1Request: {
          dateFrom: new Date(`${dateFrom}T12:00:00`),
          dateTo: new Date(`${dateTo}T12:00:00`),
        },
      }),
    enabled: Boolean(userId) && rangeValid,
  });
}
