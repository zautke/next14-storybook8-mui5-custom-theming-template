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

const defaultThemeOptions = {
  name: 'Default'
};

 const  defaultTheme= createTheme(defaultThemeOptions);
let enhancedTheme= createTheme(
  enhancedThemeOptions,
  mergeStyleOverrides
);






const mergePropOverrides = {
  components: {
    ...enhancedBaseTheme.components,
    ...defaultPropOverrides

  }
};

 const theme = createTheme(enhancedTheme, mergePropOverrides)






export {
  theme,
  defaultTheme
};

