import { InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ppsusLogo from '../public/images/PPSUS - MS.png';
import areaAdministrativa from '../public/images/Área administrativa - Logo.png';
import Image from 'next/image';
import * as React from 'react';

const theme = createTheme();

export default function loginSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              <Image
                id="logo-ppsus"
                src={ppsusLogo}
                alt="PPSUS - MS"
                width={500}
                height={45}
                objectFit="contain"
              ></Image>
              <Box
                sx={{
                  my: 2,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              ></Box>
              <Image
                id="logo-areaAdministrativa"
                src={areaAdministrativa}
                alt="Area Administrativa"
                width={500}
                height={50}
                objectFit="contain"
              ></Image>
            </Typography>
            <Box
              component="form"
              fontFamily={'Roboto'}
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ required: false }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="RGA, SIAPE ou E-mail"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ required: false }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Grid container>
                <Grid>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" size="small" />}
                    label="Lembre-se do meu acesso"
                  />
                  <Link href="#" variant="body2" underline="hover" color={'gray'}>
                    Esqueceu sua senha?
                  </Link>
                </Grid>
              </Grid>

              <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <Typography
                  fontStyle={'bold'}
                  fontFamily={'sans-serif'}
                  fontWeight={'600'}
                  textTransform={'none'}
                >
                  Acessar
                </Typography>
              </Button>
              <Grid container spacing={1} alignItems="center" justifyContent={'center'}>
                <Grid item>
                  <Typography color={'gray'} fontWeight={500}>
                    Ainda não possui um cadastro?
                  </Typography>
                </Grid>
                <Grid item>
                  <Link href="./signIn" variant="body1" underline="hover" fontWeight={550}>
                    {'Crie aqui'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://corregedoria.ufms.br/files/2021/04/UFMS.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
