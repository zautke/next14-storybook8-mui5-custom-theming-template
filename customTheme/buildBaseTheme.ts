import { createTheme, Theme } from '@mui/material/styles'
import breakpoints from './breakpoints'
import palette from './palette'
import shape from './shape'
import spacing from './spacing'
import typography from './typography'
import zDepth from './z-depth'

/* leave `createTheme' to define commented-out objects */
export const customBaseThemeOverrides: Theme = createTheme({
  //mixins,
  //components,
  palette,
  //shadows,
  //transitions,
  typography,
}, {
  //breakpoints,
  //shape,
  //spacing,
  zDepth
})
export default customBaseThemeOverrides

