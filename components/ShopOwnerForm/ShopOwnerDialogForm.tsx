import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AddShopOwnerDto } from '../../dtos/shop.dto';

export function ShopOwnerDialogForm(props: {
  shopOwner?: any;
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => Promise<void>;
}) {
  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    defaultValues: useMemo(() => {
      return props.shopOwner;
    }, [props.shopOwner]),
    resolver: classValidatorResolver(AddShopOwnerDto),
  });

  useEffect(() => {
    reset(props.shopOwner);
  }, [props.shopOwner, reset]);

  const handleClose = (event: any, reason: string) => {
    if (reason === 'backdropClick') return;

    if (props.onClose) {
      props.onClose();
    }
  };

  const onSubmit = async (data: any) => {
    if (isValid && props.onSubmit) {
      return props.onSubmit(data);
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      disableEscapeKeyDown
      fullWidth
    >
      <DialogTitle>負責人</DialogTitle>
      <DialogContent dividers>
        <form
          className="flex flex-col gap-4 mt-4 mb-4"
          autoComplete="off"
          noValidate
        >
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
                  label={'名稱'}
                  error={Boolean(error)}
                  helperText={error?.message}
									required
                />
              );
            }}
          />
          <Controller
            name={'description'}
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
                  label={'簡介'}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              );
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} disabled={isSubmitting}>
          取消
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting || !isDirty}
          variant="contained"
        >
          儲存
        </Button>
      </DialogActions>
    </Dialog>
  );
}
