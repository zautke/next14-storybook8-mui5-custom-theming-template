import React from 'react';
// import './button.css';
import {
  ButtonBase as MuiButtonBase,
  ButtonBaseProps as MuiButtonBaseProps,
  Button,
  ButtonProps
} from '@mui/material'
export const MuiButton = ({label}: any, props: ButtonProps) =>
  <Button {...props}>{label}</Button>

