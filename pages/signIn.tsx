import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ppsusLogo from 'public/images/PPSUS - MS.png';
import areaAdministrativa from 'public/images/Área administrativa - Logo.png';
import Image from 'next/image';
import * as React from 'react';
import { InputAdornment } from '@mui/material';
const theme = createTheme();

export default function SignInSide() {
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                id="nome"
                label="Nome Completo"
                name="nome"
                autoComplete="nome"
                autoFocus
              />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ required: false }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ required: false }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="RGA ou SIAPE"
                name="rga"
                autoComplete="email"
                autoFocus
              />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockPersonIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ required: false }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha (No minímo 8 caracteres)"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockPersonIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ required: false }}
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirme sua Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />

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
                  Criar Conta
                </Typography>
              </Button>
              <Grid container spacing={1} alignItems="center" justifyContent={'center'}>
                <Grid item>
                  <Typography color={'gray'} fontWeight={500}>
                    Já possui um cadastro?
                  </Typography>
                </Grid>
                <Grid item>
                  <Link href="./logIn" variant="body1" underline="hover" fontWeight={550}>
                    {'Acesse aqui'}
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
