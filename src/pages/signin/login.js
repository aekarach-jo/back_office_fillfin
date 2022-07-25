import React from 'react'
import { Button } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Login() {
  return (
    <div >
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '20vh' }} />
        <Button variant="contained" size="medium" sx={{ bgcolor: '#357a38', }}>
          LOGIN
        </Button>
      </Container>
    </div>
  );
}
