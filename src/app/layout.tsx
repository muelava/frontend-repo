'use client';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
