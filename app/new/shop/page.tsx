'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Main } from '../../../components/Main';
import { ShopForm } from '../../../components/ShopForm/ShopForm';
import { useShopMutations } from '../../../hooks/useShop';

export default function ShopEditPage(props: any) {
  const mutations = useShopMutations();
  const handleSubmit = async (data: any) => {
    await mutations.add.mutateAsync(data);
  };

  const router = useRouter();
  useEffect(() => {
    if (mutations.add.isSuccess) {
      router.replace('/');
    }
  }, [mutations.add.isSuccess, router]);

  return (
    <Main>
      <ShopForm
        shop={useMemo(
          () => ({
            displayName: '',
            address: '',
            phoneNumber: '',
            owner: { id: null },
          }),
          [],
        )}
        onSubmit={handleSubmit}
      ></ShopForm>
    </Main>
  );
}
