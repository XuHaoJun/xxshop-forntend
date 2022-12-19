'use client';

import Button from '@mui/material/Button';
import Link from 'next/link';
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
      <div>
        <div className="mb-4  flex flex-row">
					<div className='grow'>
					</div>
          <Link href="/new/shop" passHref legacyBehavior>
            <Button variant="contained">新增店家</Button>
          </Link>
        </div>
        <ShopTable
          rows={shops || []}
          loading={isLoading}
          onDeleteMany={handleDeleteMany}
        ></ShopTable>
      </div>
    </Main>
  );
}
