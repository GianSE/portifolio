import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import { LocaleProvider } from '@/hooks/useLocale';
import { router } from '@/router';

export function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <RouterProvider router={router} />
      </LocaleProvider>
    </ThemeProvider>
  );
}
