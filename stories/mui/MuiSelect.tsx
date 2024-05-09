import React from 'react'
import SelectExample from '../../components/MuiComponentSamples/Samples/Select'
import { SelectProps } from '@mui/material'

// eslint-disable-next-line react/prop-types
export const MuiSelect = (props: SelectProps): JSX.Element => (
  <SelectExample { ...props } />
)
