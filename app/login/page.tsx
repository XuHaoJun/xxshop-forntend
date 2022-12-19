'use client';

import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoginForm from '../../components/LoginForm';
import { Main } from '../../components/Main';
import { useMe } from '../../hooks/useMe';

export default function LoginPage() {
  const { isSuccess } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.replace('/');
    }
  }, [router, isSuccess]);

  if (isSuccess) {
    return (
      <Main>
        <div>Redirecting....</div>
      </Main>
    );
  } else {
    return (
      <Main>
        <Container maxWidth="sm" disableGutters>
          <LoginForm></LoginForm>
        </Container>
      </Main>
    );
  }
}
