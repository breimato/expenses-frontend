import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { PatchProfileV1Request } from '@/api/generated';
import { getProfileApi, patchProfileApi } from '@/api/client';
import { queryKeys } from '@/api/queryKeys';
import { useAuth } from '@/context/AuthContext';

export function useProfile() {
  const { user } = useAuth();
  const userId = user?.id;
  return useQuery({
    queryKey: queryKeys.profile(userId ?? 0),
    queryFn: () => getProfileApi.getProfileV1(),
    enabled: Boolean(userId),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PatchProfileV1Request) => patchProfileApi.patchProfileV1({ patchProfileV1Request: body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}
