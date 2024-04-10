import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { theme, Mode } from '../app/theme/theme'
import customTheme, { defaultTheme } from '../customTheme'
// import roboto from 'next/font/google'

// const defaultTheme = createTheme();

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      default: defaultTheme,
      custom: customTheme,
      defaultDark: theme(defaultTheme, Mode.DARK),
      customDark: theme(customTheme, Mode.DARK),
    },
    defaultTheme: 'default',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  })]

export const globalTypes = {
  theme: {
    name: 'Theme',
    title: 'Theme',
    description: 'Theme for your components',
    defaultValue: 'default',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [
        { value: 'default', left: '*', title: 'MUI Default theme' },
        { value: 'custom', left: '+', title: 'MUI Customized theme' },
        { value: 'defaultDark', left: '☀️', title: 'defaultDark' },
        { value: 'customDark', left: '🌙', title: 'customDark' },
      ],
    },
  },
  toggler: {
    name: 'ThemeModeToggler',
    title: 'ThemeModeTogger',
    description: 'Light/Dark Theme Mode for your components',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [
        { value: 'default', left: '*', title: 'MUI Default theme' },
        { value: 'custom', left: '+', title: 'MUI Customized theme' },
        { value: 'light', left: '☀️', title: 'Light mode' },
        { value: 'dark', left: '🌙', title: 'Dark mode' },
      ],
    },
  }
}

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview



