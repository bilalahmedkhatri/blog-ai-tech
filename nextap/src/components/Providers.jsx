'use client';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../createEmotionCache';
import theme from '../app/theme';

const clientCache = createEmotionCache();

export function Providers({ children }) {
  return (
    <CacheProvider value={clientCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}