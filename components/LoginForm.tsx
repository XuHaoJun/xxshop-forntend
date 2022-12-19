'use client';

import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLine } from '@fortawesome/free-brands-svg-icons';
import { IconButton } from '@mui/material';

export default function LoginForm() {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="flex flex-col gap-2">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          defaultValue={''}
          name={'email'}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label={'Email'}
              disabled
            />
          )}
        />
        <Controller
          defaultValue={''}
          name={'password'}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label={'Password'}
              type="password"
              disabled
            />
          )}
        />
        <Button type="submit" variant="contained" size="large" disabled>
          Login
        </Button>
      </form>
      <Divider className="pt-2 pb-2">Or</Divider>
      <div className="flex flex-row">
        <a href="/api/auth/login/line">
          <IconButton>
            <FontAwesomeIcon
              icon={faLine}
              className="text-green-500"
              size="3x"
            />
          </IconButton>
        </a>
        <div className="grow"></div>
      </div>
    </div>
  );
}
