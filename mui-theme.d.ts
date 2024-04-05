// createTheme.d.ts/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme, ThemeOptions, createTheme } from '@mui/material';

declare module '@mui/material' {
  interface ThemeOptions {
    name?: string;
  }

  interface Theme {
    name?: string;
  }
}

export const t: Theme = createTheme({
  name: 'test',
})
