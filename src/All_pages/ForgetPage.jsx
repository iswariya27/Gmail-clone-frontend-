import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import useApi from '../hook/UseApi.jsx';
import { API_URLS } from '../service/centralUrl';
import './AllPages.css';

const defaultTheme = createTheme();

export default function Forget() {

  const [email, setEmail] = useState({ email: "" });
  const getForget = useApi(API_URLS.forgetPass);
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const res = await getForget.call(email, '') 
  //     event.target.reset();
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       const res = await getForget.call(email, '');
       if (res.status) {
          event.target.reset();
       }
    } catch (error) {
       console.log(error);
    }
 };

 
  const handlechange = (e) => {
    e.preventDefault();
    setEmail({ ...email, [e.target.name]: e.target.value });
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className="imgRegister">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          
          <Box
            sx={{
              marginTop: 7,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
               <img className='mailLogos' src='/security-with-login-password.jpg' />
            <Typography component="h1" variant="h5">
              Forget Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handlechange} />

              <Typography color={'red'}>
                Enter registered email
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>Send</Button>

              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Go  to Login Page
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
}