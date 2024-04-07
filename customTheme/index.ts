import customBaseTheme from './buildBaseTheme';
import styleOverrides from './componentOverrides';
import defaultPropOverrides from './defaultProps';
import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';



const mergeStyleOverrides = {
  components: {
    ...styleOverrides
  }
}

const defaultThemeOptions: ThemeOptions = {
  name: 'Default'
}
export const defaultTheme: Theme = createTheme(defaultThemeOptions);

const customThemeOptions = {
  ...customBaseTheme,
  name: 'custom'
}
const customTheme: Theme = createTheme(
  customThemeOptions,
  mergeStyleOverrides
)






const mergePropOverrides = {
  components: {
    ...customBaseTheme.components,
    ///...defaultPropOverrides
  }
}

export const finalTheme: Theme = createTheme(customTheme, mergePropOverrides)

// console.log("defaultTheme", JSON.stringify(defaultTheme, null, 2))


// console.log('THEME DELTA', { ...defaultTheme, ...customTheme })

export default finalTheme;

