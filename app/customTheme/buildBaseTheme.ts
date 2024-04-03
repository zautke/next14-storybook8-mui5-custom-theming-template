import { createTheme,  Theme,  ThemeOptions } from '@mui/material/styles';
import breakpoints from './breakpoints';
import palette from './palette';
import shape from './shape';
import spacing from './spacing';
import typography from './typography';
import zDepth from './z-depth';

/* leave `createTheme' to define commented-out objects */
export const baseThemeExtensions: Theme = createTheme({
  //mixins:
  //components:
  palette: palette,
  //shadows:
  //transitions:
  typography: typography,
  unstable_strictMode: false
},{
  breakpoints,
  shape,
  spacing
  //zDepth
});


export default baseThemeExtensions
