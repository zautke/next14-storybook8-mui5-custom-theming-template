import React from 'react'
import ThemeRegistry from '../components/ThemeRegistry'
import { Typography } from '@mui/material'


function Home() {
  return (
    <ThemeRegistry>
      <Typography variant="h2">Hello, world!</Typography>
    </ThemeRegistry>
  )
}


export default Home
