import React from 'react'
import TypographyExample from '../../components/MuiComponentSamples/Samples/Typography'
import { TypographyProps } from '@mui/material'

// eslint-disable-next-line react/prop-types
export const MuiTypography = (props: TypographyProps): JSX.Element => (
  <TypographyExample { ...props } />
)
