import { Transform } from 'class-transformer';

export class ShopEditPageParams {
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
}
