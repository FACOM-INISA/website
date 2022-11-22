import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import backgroundImg from 'images/loginPageImage.png';
import areaAdministrativa from 'images/Área administrativa - Logo.png';
import Image from 'next/image';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ppsusLogo from 'images/PPSUS - MS.png';
import { iconButtonClasses, InputAdornment, SvgIcon } from '@mui/material';
import Cadastro from './signIn';
import { url } from 'inspector';

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
            <Box component="form" fontFamily={'Roboto'}  noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                inputProps={{startAdornment: (<InputAdornment position = "start">
                
                </InputAdornment>)}}
                InputLabelProps = {{required: false}}
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
                InputLabelProps = {{required: false}}
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
                  <Link href="#" variant="body2" underline='hover' color={'gray'}>
                    Esqueceu sua senha?
                  </Link>
                </Grid>
              </Grid>

              <Button
                type="submit"
                size='large'
                
                fullWidth
                variant="contained"
                
                sx={{ mt: 3, mb: 2 }}
              >
                <Typography fontStyle={'bold'} fontFamily={'sans-serif'} fontWeight={'600'} textTransform = {'none'}>
                  Acessar
                </Typography>
              </Button>
              <Grid container spacing={1} alignItems="center" justifyContent={'center'}>
                <Grid item>
                <Typography color={'gray'} fontWeight ={500}>
                Ainda não possui um cadastro?
              </Typography>
                </Grid>
              <Grid item >
              <Link href='./signIn' variant="body1"  underline='hover' fontWeight={550}>
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
            backgroundImage:
              'url(https://lh3.googleusercontent.com/p/AF1QipOlora7AbKkUOoqPGcta18dzPtCib_FD2XJ_Ek9=s680-w680-h510)',
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
