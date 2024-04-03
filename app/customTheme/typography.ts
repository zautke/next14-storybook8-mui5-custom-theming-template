
import extendedPalette from './palette';
import colorGuide, { ColorGuide } from './colorGuide';
import createTypography, { TypographyOptions, TypographyStyle, TypographyUtils } from '@mui/material/styles/createTypography';
import { Palette } from '@mui/material/styles/createPalette';

const palette= extendedPalette;


const fontSize = 14; // material default
const htmlFontSize = 16; // browser default

const coef = fontSize / 14;
export function pxToRem(value: number):string {
  return `${(value / htmlFontSize) * coef}rem`;
}

// const barlowFont = {
//   fontFamily: [
//     'Barlow', 'Lato', 'sans-serif'
//   ].join(', '),
// }

const barlowFont = {
  fontFamily:  [
    '"Barlow"',
    '"Lato"',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'sans-serif'
  ].join(', '),
}

const cormorantFont = {
  fontFamily:  [
    '"cormorant"',
    '"Lato"',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'sans-serif'
  ].join(', '),
}

const fontFamily = {
  ...barlowFont,
  fontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  htmlFontSize: 14
};

const buttonOverrides = {
  ...barlowFont,
  fontSize: pxToRem(13),
  fontWeight: 'normal',
  letterSpacing: 'normal',
  lineHeight: 1.15,
  //textTransform: 'captialize',
  color: colorGuide['greyscale'],
  fontVariant: 'italic'
}


const typographyOverrides = {
  button: {
    ...cormorantFont,
    fontSize: pxToRem(13),
    fontWeight: 'normal',
    letterSpacing: 'normal',
    lineHeight: 1.15,
    textTransform: 'captialize',
    color: colorGuide['greyscale'],
    fontVariant: 'italic'
  },
  fontFamily: fontFamily
};

export interface FontStyle
  extends Required<{
    fontFamily: React.CSSProperties['fontFamily'];
    fontSize: number;
    fontWeightLight: React.CSSProperties['fontWeight'];
    fontWeightRegular: React.CSSProperties['fontWeight'];
    fontWeightMedium: React.CSSProperties['fontWeight'];
    fontWeightBold: React.CSSProperties['fontWeight'];
    htmlFontSize: number;
  }> {}

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline';

  export interface FontStyle
    extends Required<{
      fontFamily: React.CSSProperties['fontFamily'];
      fontSize: number;
      fontWeightLight: React.CSSProperties['fontWeight'];
      fontWeightRegular: React.CSSProperties['fontWeight'];
      fontWeightMedium: React.CSSProperties['fontWeight'];
      fontWeightBold: React.CSSProperties['fontWeight'];
      htmlFontSize: number;
    }> {}

    //typography: TypographyOptions | ((palette: Palette) => TypographyOptions),

    export interface Typography extends Record<Variant, TypographyStyle>, FontStyle, TypographyUtils {}

// export interface TypographyOptions
//   extends Partial<Record<Variant, TypographyStyleOptions> & FontStyleOptions> {}

export default createTypography(
    palette,
   {
      // h1: '',
      // h2: '',
      // h3: '',
      // h4: '',
      // h5: '',
      // h6: '',
      // subtitle1: '',
      // subtitle2: '',
      // body1: '',
      // body2: '',
      // caption: '',
      button: buttonOverrides,
      // overline: '',
      ...barlowFont
      // pxToRem: function (px: number): string {
      //   throw new Error('Function not implemented.');
      // }
    }
  )


//   console.log("typographyInput:", typography )

// export default typography;
