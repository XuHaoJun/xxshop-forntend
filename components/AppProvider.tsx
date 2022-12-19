'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { EmotionCache } from '@emotion/react';
import theme from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import EmotionProvider from './EmotionProvider';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

interface MyAppProps {
  emotionCache?: EmotionCache;
  children?: React.ReactNode;
}

export default function Providers(props: MyAppProps) {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <EmotionProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
          <ToastContainer autoClose={2000} />
        </ThemeProvider>
      </EmotionProvider>
    </QueryClientProvider>
  );
}
