import 'reflect-metadata';

import { Transform, Type } from 'class-transformer';
import {
	IsDefined,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength, ValidateNested
} from 'class-validator';
import * as _ from 'rambda';

export class AddShopOwnerDto {
  @MaxLength(100)
	@IsNotEmpty()
  @IsString()
  @IsDefined()
  displayName: string;

  @Transform(({ value }) => (_.isNil(value) ? '' : value))
  @MaxLength(300)
	@IsNotEmpty()
  @IsString()
  @IsDefined()
  description: string;
}

export class ShopOwnerIdDto {
  @Transform(({ value }) => (value === undefined ? null : value))
  @IsInt()
  @IsOptional()
  id?: number;
}

export class AddShopDto {
  @MaxLength(100)
	@IsNotEmpty()
  @IsString()
  @IsDefined()
  displayName: string;

  @MaxLength(300)
	@IsNotEmpty()
  @IsString()
  @IsDefined()
  address: string;

  @MaxLength(300)
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ValidateNested()
  @Type(() => ShopOwnerIdDto)
  @IsDefined()
  owner: ShopOwnerIdDto;
}

export class PutShopDto extends AddShopDto {}
