import Avatar from '@mui/material/Avatar';
import * as R from 'rambda';
import React from 'react';
import AccountMenu from './AccountMenu';

export default function UserAvatar({ user }: any) {
  return (
    <AccountMenu user={user}>
      <MyAvatar user={user}></MyAvatar>
    </AccountMenu>
  );
}

function MyAvatar({ user }: any) {
  if (R.isEmpty(user.avatarUrl)) {
    return <Avatar alt={user.displayName}>{user.displayName[0]}</Avatar>;
  } else {
    return <Avatar alt={user.displayName} src={user.avatarUrl} />;
  }
}
