import React from 'react';
import {ThemeSwitcher} from '../components/ThemeRegistry';
import { Typography } from '@mui/material';

// import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';

function Home() {
  return (
    <>
      <ThemeSwitcher />
      <Typography variant="h2">Hello, world!</Typography>
    </>
  );
}


export default Home;
