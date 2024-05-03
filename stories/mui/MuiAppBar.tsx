import React from 'react'
import AppBarExample from '../../components/MuiComponentSamples/Samples/AppBar'
import { AppBarProps } from '@mui/material'

// eslint-disable-next-line react/prop-types
export const MuiAppBar = (props: AppBarProps): JSX.Element => (
  <AppBarExample { ...props } />
)

