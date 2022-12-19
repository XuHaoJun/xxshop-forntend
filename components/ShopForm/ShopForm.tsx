'use client';

import { Controller, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AddShopDto } from '../../dtos/shop.dto';
import { useShopOwners } from '../../hooks/useShop';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { MenuItem, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { ShopOwnerDialogForm } from '../ShopOwnerForm/ShopOwnerDialogForm';
import * as _ from 'rambda';

export function ShopForm(props: {
  shop: any;
  onSubmit?: (data: any) => Promise<void>;
}) {
  const { shop } = props;
  const {
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    resetField,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    defaultValues: useMemo(() => {
      return props.shop;
    }, [props.shop]),
    resolver: classValidatorResolver(AddShopDto),
  });

  useEffect(() => {
    reset(props.shop);
  }, [props.shop, reset]);

  const onSubmit = async (data: any) => {
    if (isValid && props.onSubmit) {
      return props.onSubmit(data);
    }
  };
  const handleReset = () => {
    reset();
  };

  const shopOwnersQuery = useShopOwners();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [newShopOwner, setNewShopOwner] = useState({ id: null });
  const handleSubmitShopOwner = async (data: any) => {
    console.log(data);
    const owner = await shopOwnersQuery.mutations.add.mutateAsync(data);
    setNewShopOwner(owner);
    setOpen(false);
  };
  useEffect(() => {
    if (newShopOwner.id) {
      setValue('owner.id', newShopOwner.id, { shouldDirty: true });
    }
  }, [newShopOwner.id, setValue, shopOwnersQuery.data]);

  return (
    <form className="flex flex-col gap-4" autoComplete="off" noValidate>
      <Controller
        name={'displayName'}
        control={control}
        render={(props) => {
          const {
            field: { onChange, value, onBlur },
            fieldState: { error },
          } = props;
          return (
            <TextField
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label={'店家名稱'}
              error={Boolean(error)}
              helperText={error?.message}
							required
            />
          );
        }}
      />
      <Controller
        name={'address'}
        control={control}
        render={(props) => {
          const {
            field: { onChange, value, onBlur },
            fieldState: { error },
          } = props;
          return (
            <TextField
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label={'地址'}
              error={Boolean(error)}
              helperText={error?.message}
							required
            />
          );
        }}
      />
      <Controller
        name={'phoneNumber'}
        control={control}
        render={(props) => {
          const {
            field: { onChange, value, onBlur },
            fieldState: { error },
          } = props;
          return (
            <TextField
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label={'電話'}
              error={Boolean(error)}
              helperText={error?.message}
            />
          );
        }}
      />
      <div className="flex flex-row">
        <Controller
          control={control}
          name={'owner.id'}
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth>
              <InputLabel id="owner">負責人</InputLabel>
              <Select
                onChange={onChange}
                value={
                  !shopOwnersQuery.isSuccess || _.isNil(value) ? -1 : value
                }
                label="負責人"
                displayEmpty
                labelId="owner"
              >
                {[{ id: -1 }, ...(shopOwnersQuery.data || [])].map(
                  (option: any) => {
                    return (
                      <MenuItem key={option.id} value={option.id}>
                        {option.id === -1 ? (
                          <div className="flex flex-row gap-4 items-end invisible">
                            <Typography variant="caption">_</Typography>
                            <Typography variant="body1">_</Typography>
                            <Typography variant="body1">_</Typography>
                          </div>
                        ) : (
                          <div className="flex flex-row gap-4 items-end">
                            <Typography variant="caption">
                              id: {option.id}
                            </Typography>
                            <Typography variant="body1">
                              姓名: {option.displayName}
                            </Typography>
                            <Typography variant="body1">
                              介紹: {option.description}
                            </Typography>
                          </div>
                        )}
                      </MenuItem>
                    );
                  },
                )}
              </Select>
            </FormControl>
          )}
        />
        <Button className="w-32" color="secondary" onClick={handleClickOpen}>
          新增負責人
        </Button>
        <ShopOwnerDialogForm
          shopOwner={useMemo(
            () => ({ displayName: '', description: '' }),
            [newShopOwner],
          )}
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmitShopOwner}
        />
      </div>
      <div className="flex flex-row gap-2">
        <Button className="w-32" onClick={handleReset} disabled={isSubmitting || !isDirty}>
          重置
        </Button>
        <Button
          className="w-32"
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={isSubmitting || !isDirty}
        >
          儲存
        </Button>
      </div>
    </form>
  );
}

function toShopFormValue(shop: any) {}
