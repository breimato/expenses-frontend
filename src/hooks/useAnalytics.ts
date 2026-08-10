import { useQuery } from '@tanstack/react-query';
import {
  getAnalyticsAveragesApi,
  getAnalyticsCategoryBreakdownApi,
  getAnalyticsProjectionsApi,
  todayIsoDate,
} from '@/api/client';
import { queryKeys } from '@/api/queryKeys';

export function useAnalytics(referenceDate: string = todayIsoDate()) {
  // Noon local avoids UTC day shift when serializing to ISO date string.
  const date = new Date(`${referenceDate}T12:00:00`);

  const averages = useQuery({
    queryKey: [...queryKeys.analytics(referenceDate), 'averages'],
    queryFn: () =>
      getAnalyticsAveragesApi.getAnalyticsAveragesV1({
        getAnalyticsAveragesV1Request: { referenceDate: date },
      }),
  });

  const projections = useQuery({
    queryKey: [...queryKeys.analytics(referenceDate), 'projections'],
    queryFn: () =>
      getAnalyticsProjectionsApi.getAnalyticsProjectionsV1({
        getAnalyticsProjectionsV1Request: { referenceDate: date },
      }),
  });

  const categoryBreakdown = useQuery({
    queryKey: [...queryKeys.analytics(referenceDate), 'category-breakdown'],
    queryFn: () =>
      getAnalyticsCategoryBreakdownApi.getAnalyticsCategoryBreakdownV1({
        getAnalyticsAveragesV1Request: { referenceDate: date },
      }),
  });

  return { averages, projections, categoryBreakdown, referenceDate };
}
