'use client';

import { Main } from '../components/Main';
import ShopTable from '../components/ShopTable/ShopTable';
import useAuthGuard from '../hooks/useAuthGuard';
import { useShops } from '../hooks/useShop';

export default function HomePage() {
  useAuthGuard();
  const { data: shops, isLoading, mutations } = useShops();

  const handleDeleteMany = (ids: number[]) => {
    mutations.deleteMany.mutate(ids);
  };

  return (
    <Main>
      <ShopTable
        rows={shops || []}
        loading={isLoading}
        onDeleteMany={handleDeleteMany}
      ></ShopTable>
    </Main>
  );
}
