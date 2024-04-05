
import React from 'react';
import { Theme } from '@mui/material/styles/createTheme';
import { Dispatch, SetStateAction } from 'react';

// interface ActiveElementArray<T> {};


// declare module '@mui/material/styles' {
//   interface ThemeOptions {
//     name?: string;
//   }
//   interface Theme {
//     name?: string;
//   }
// }

// function useMultipleThemes<Theme>(): MuiThemeState;
// declare module '@mui/material/styles/createTheme' {
//   interface ThemeOptions {
//     name?: string;
//   }

//   interface Theme {
//     name?: string;
//   }
// }

import "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    // tan: string;
    // lightRed: string;
    // red: string;
    // offBlack: string;
  }
}

/* augmentations to facilitate a new custom Typography Variant */
declare module '@mui/material/styles' {
  interface TypographyVariants {
    //inputLabel: React.CSSProperties;
    //inputPlaceholder: React.CSSProperties;
    //inputTypedText: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    //inputLabel?: React.CSSProperties;
    //inputPlaceholder?: React.CSSProperties
    //inputTypedText?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    //inputLabel: true;
    //inputPlaceholder: true;
    //inputTypedText: true;
    //h3: false;         <-- disable `h3' variant
  }
}

type MuiThemeTuple = [Theme, Theme];
type MuiThemeState = [Theme | undefined, React.Dispatch<React.SetStateAction<Theme | undefined>>];
type MuiThemeStateTuple<Theme> = [Theme, Dispatch<SetStateAction<Theme>>];
