import { useQuery } from '@tanstack/react-query';
import {
  getAnalyticsAveragesApi,
  getAnalyticsCategoryBreakdownApi,
  getAnalyticsProjectionsApi,
  todayIsoDate,
} from '@/api/client';
import { queryKeys } from '@/api/queryKeys';
import { useAuth } from '@/context/AuthContext';

export function useAnalytics(referenceDate: string = todayIsoDate()) {
  const { user } = useAuth();
  const userId = user?.id;
  // Noon local avoids UTC day shift when serializing to ISO date string.
  const date = new Date(`${referenceDate}T12:00:00`);
  const enabled = Boolean(userId);

  const averages = useQuery({
    queryKey: [...queryKeys.analytics(userId ?? 0, referenceDate), 'averages'],
    queryFn: () =>
      getAnalyticsAveragesApi.getAnalyticsAveragesV1({
        getAnalyticsAveragesV1Request: { referenceDate: date },
      }),
    enabled,
  });

  const projections = useQuery({
    queryKey: [...queryKeys.analytics(userId ?? 0, referenceDate), 'projections'],
    queryFn: () =>
      getAnalyticsProjectionsApi.getAnalyticsProjectionsV1({
        getAnalyticsProjectionsV1Request: { referenceDate: date },
      }),
    enabled,
  });

  const categoryBreakdown = useQuery({
    queryKey: [...queryKeys.analytics(userId ?? 0, referenceDate), 'category-breakdown'],
    queryFn: () =>
      getAnalyticsCategoryBreakdownApi.getAnalyticsCategoryBreakdownV1({
        getAnalyticsAveragesV1Request: { referenceDate: date },
      }),
    enabled,
  });

  return { averages, projections, categoryBreakdown, referenceDate };
}
