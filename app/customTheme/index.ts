import enhancedBaseTheme from './buildBaseTheme';
import styleOverrides from './componentOverrides';
import defaultPropOverrides from './defaultProps';
import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

const mergeStyleOverrides = {
  components: {
    ...styleOverrides
  }
};

const enhancedThemeOptions = {
  ...enhancedBaseTheme,
  name: 'Enhanced'
};

const defaultThemeOptions: ThemeOptions = {
  name: 'Default'
};

export const defaultTheme: Theme = createTheme(defaultThemeOptions);
const enhancedTheme: Theme = createTheme(
  enhancedThemeOptions,
  mergeStyleOverrides
);






const mergePropOverrides = {
  components: {
    ...enhancedBaseTheme.components,
    ...defaultPropOverrides

  }
};

export const finalTheme: Theme = createTheme(enhancedTheme, mergePropOverrides)






export default finalTheme;

