// createTheme.d.ts/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme, createTheme } from '@mui/material/styles'
import { } from "@mui/material/styles"
import { } from '@mui/material/Typography'
import { } from "@mui/material/styles/createPalette"
import { ColorGuide } from "./customTheme/colorGuide"

declare module '@mui/material/styles' {
  interface ThemeOptions
  {
    name?: string
  }

  interface Theme
  {
    name?: string
  }
}

export const t: Theme = createTheme({
  name: 'test',
})

//--- colors.d.ts
export type PartialColorGuide = {
  [P in keyof ColorGuide]?: Partial<ColorGuide[P]>
}


//export type PaletteColorOptions = PaletteColorExts | SimplePaletteColorOptions | ColorPartial;

declare module '@mui/material/styles' {
  export interface TypographyVariants
  {
    banner?: React.CSSProperties
    poster?: React.CSSProperties
  }

  // allow configuration using `createTheme`
  export interface TypographyVariantsOptions
  {
    banner?: React.CSSProperties
    poster?: React.CSSProperties
  }
}

declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions
  {
    primary?: PaletteColorOptions
    secondary?: PaletteColorOptions
    error?: PaletteColorOptions
    warning?: PaletteColorOptions
    info?: PaletteColorOptions
    success?: PaletteColorOptions
    mode?: PaletteMode
    tonalOffset?: PaletteTonalOffset
    contrastThreshold?: number
    common?: Partial<CommonColors>
    grey?: ColorPartial
    text?: Partial<TypeText>
    divider?: string
    action?: Partial<TypeAction>
    background?: Partial<TypeBackground>
    getContrastText?: (background: string) => string
    colorGuide?: ColorGuide
    ext?: any
  }

  export interface TypeBackground
  {
    bk1?: string
    bk2?: string
    bk3?: string
    bk4?: string
  }

  export interface Palette
  {
    colorGuide: ColorGuide
    ext?: any
  }

  export interface Palette
  {
    colorGuide: ColorGuide
    ext?: any
  }

  export interface PaletteColor extends ColorPartial<Color> { }
}
