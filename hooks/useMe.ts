import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useMe() {
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => axios('/api/me').then((res) => res.data),
    retry: 0,
  });
  const mutations = useMeMutations();
  return {
    ...meQuery,
    mutations,
  };
}

export function useMeMutations() {
  const queryClient = useQueryClient();
  const logout = useMutation({
    mutationFn: () =>
      axios('/api/auth/logout', { method: 'POST' }).then((res) => res.data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
  return {
    logout,
  };
}
