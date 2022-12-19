'use client';

import Container from '@mui/material/Container';
import React from 'react';

export function Main({ children }: { children?: React.ReactNode }) {
  return (
    <Container maxWidth="md" className="pt-4">
      {children}
    </Container>
  );
}
