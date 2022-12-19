'use client';

import { plainToClass } from 'class-transformer';
import { Main } from '../../../../components/Main';
import { ShopForm } from '../../../../components/ShopForm/ShopForm';
import { useShop } from '../../../../hooks/useShop';
import { ShopEditPageParams } from './dto';

export default function ShopEditPage(props: any) {
  const params: ShopEditPageParams = plainToClass(
    ShopEditPageParams,
    props.params,
  );
  const { data: shop, isSuccess, mutations } = useShop(params.id);
  const handleSubmit = async (data: any) => {
    await mutations.put.mutateAsync(data);
  };
  return (
    <Main>
      {isSuccess && <ShopForm shop={shop} onSubmit={handleSubmit}></ShopForm>}
    </Main>
  );
}
