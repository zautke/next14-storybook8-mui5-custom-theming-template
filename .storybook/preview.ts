import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { theme, Mode } from '../app/theme/theme'

const defaultTheme = createTheme();

// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/400.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'
// import '@fontsource/material-icons'

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      default: defaultTheme,
      //enhanced: enhancedTheme,
      light: theme(Mode.LIGHT),
      dark: theme(Mode.DARK),
    },
    defaultTheme: 'default',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  })];

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
        //{ value: 'enhanced', left: '+', title: 'MUI Enhanced theme' },
        { value: 'light', left: '☀️', title: 'Light mode' },
        { value: 'dark', left: '🌙', title: 'Dark mode' },
      ],
    },
  },
};

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;



