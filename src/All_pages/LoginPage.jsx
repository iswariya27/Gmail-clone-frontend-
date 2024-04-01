import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import useApi from '../hook/UseApi.jsx';
import { API_URLS } from '../service/centralUrl';
import { useDispatch } from 'react-redux';
import { setToken } from '../components/redux-container/slices/emailSlice';
import './AllPages.css';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: ""
    , password: ""
  });

  //calling end point from central url
  const getlogin = useApi(API_URLS.userLogin);

  //function for login
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await getlogin.call(user, '');
      event.target.reset();
      if (res.status) {
        const token = res.data.jwtToken
        dispatch(setToken(token));
        localStorage.setItem('token', token);
        navigate('/inbox');
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handlechange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className="mainContainer">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 7,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <img className='mailLogo' src='https://1000logos.net/wp-content/uploads/2021/05/Gmail-logo.png' />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" id='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlechange} />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me" />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>Sign In</Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forget" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
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
