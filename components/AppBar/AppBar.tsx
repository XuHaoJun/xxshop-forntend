'use client';

import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMe } from '../../hooks/useMe';
import UserAvatar from './UserAvatar';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" legacyBehavior passHref>
            <Button
              color="inherit"
              disableElevation
              style={{ textTransform: 'none' }}
            >
              <Typography variant="h6">Shops</Typography>
            </Button>
          </Link>
          <Box sx={{ flexGrow: 1 }}></Box>
          <LoginOrAvatar></LoginOrAvatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function LoginOrAvatar() {
  const { data: me, isSuccess } = useMe();
  if (isSuccess) {
    return <UserAvatar user={me}></UserAvatar>;
  } else {
    return (
      <Link href="/login" legacyBehavior passHref>
        <Button color="inherit">Login</Button>
      </Link>
    );
  }
}
