import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { PatchProfileV1Request } from '@/api/generated';
import { getProfileApi, patchProfileApi } from '@/api/client';
import { queryKeys } from '@/api/queryKeys';

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => getProfileApi.getProfileV1(),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PatchProfileV1Request) => patchProfileApi.patchProfileV1({ patchProfileV1Request: body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}
