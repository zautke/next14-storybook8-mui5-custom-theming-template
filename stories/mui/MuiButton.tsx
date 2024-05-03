import React from 'react';
// import './button.css';
import {
  ButtonBase as MuiButtonBase,
  ButtonBaseProps as MuiButtonBaseProps,
  Button,
  ButtonProps
} from '@mui/material'
export const MuiButton = ({label}: any, props: ButtonProps) => {
console.log('ButtonProps', JSON.stringify(props, null, 2))
  return (
    <>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}


