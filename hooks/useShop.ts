import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export function useShops() {
  const shopsQuery = useQuery({
    queryKey: ['shops'],
    queryFn: () => axios('/api/shops').then((res) => res.data),
  });
  const mutations = useShopMutations();
  return { ...shopsQuery, mutations };
}

export function useShop(id: number) {
  const shopQuery = useQuery({
    queryKey: ['shops', id],
    queryFn: () => axios(`/api/shops/${id}`).then((res) => res.data),
  });
  const mutations = useShopMutations(id);
  return { ...shopQuery, mutations };
}

export function useShopMutations(id?: number) {
  const queryClient = useQueryClient();

  const deleteMany = useMutation({
    mutationFn: (ids: number[]) =>
      axios('/api/shops', { method: 'DELETE', data: { ids } }).then(
        (res) => res.data,
      ),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['shops'] });
      toast('刪除成功!');
    },
  });

  const put = useMutation({
    mutationFn: (body: any) =>
      axios(`/api/shops/${id}`, { method: 'PUT', data: body }).then(
        (res) => res.data,
      ),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['shops', id] });
      toast('更新成功!');
    },
  });

  const add = useMutation({
    mutationFn: (body: any) =>
      axios(`/api/shops`, { method: 'POST', data: body }).then(
        (res) => res.data,
      ),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['shops'] });
    },
  });

  return {
    deleteMany,
    put,
    add,
  };
}

export function useShopOwners() {
  const shopsQuery = useQuery({
    queryKey: ['shop-owners'],
    queryFn: () => axios('/api/shop-owners').then((res) => res.data),
  });
  const mutations = useShopOwnerMutations();
  return { ...shopsQuery, mutations };
}

export function useShopOwnerMutations() {
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: (body: any) =>
      axios(`/api/shop-owners`, { method: 'POST', data: body }).then(
        (res) => res.data,
      ),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['shop-owners'] });
      toast('新增成功!');
    },
  });

  return {
    add,
  };
}
