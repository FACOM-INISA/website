import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/images/ufms.png';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material/';
import TelIcon from '@mui/icons-material/Call';
import LocIcon from '@mui/icons-material/Room';
import EditalIcon from '@mui/icons-material/Description';

const FooterComponent: NextPage = () => {
  return (
    <Box
      sx={{
        padding: '0 10em',
        height: 170,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      {/* container esquerdo */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Link href="/">
            <a>
              <Image src={logo} alt="UFMS Logo" width={58} height={80} />
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Divider
            sx={{
              height: 80,
              width: 3,
              backgroundColor: 'primary.contrastText',
              borderRadius: '2px',
            }}
            orientation="vertical"
            flexItem
          />
        </Grid>
        <Grid item>
          <Typography variant="h6">INISA</Typography>
          <Typography>Instituto Integrado de Saúde</Typography>
        </Grid>
      </Grid>

      {/* container direito */}
      <Grid container direction="column" sx={{ textAlign: 'right' }}>
        <Grid item>
          <IconButton>
            <TelIcon sx={{ color: 'primary.contrastText' }} />
            <Typography
              sx={{
                fontSize: '0.6em',
                color: 'primary.contrastText',
                paddingLeft: '10px',
              }}
            >
              (67) 3345-7774 / (67) 3345-7826
            </Typography>
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton href="https://goo.gl/maps/a3UUwjr5dUjJV5Vi9" target="_blank" rel="noreferrer">
            <LocIcon sx={{ color: 'primary.contrastText' }} />

            <Typography
              sx={{
                fontSize: '0.6em',
                color: 'primary.contrastText',
                paddingLeft: '10px',
              }}
            >
              Cidade Universitária, Caixa Postal 549, CEP 79070-900. Campo Grande - MS
            </Typography>
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton
            href="https://www.fundect.ms.gov.br/wp-content/uploads/2020/07/1-CHAMADA-FUNDECT-PPSUS-Nº-08-2020.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <EditalIcon sx={{ color: 'primary.contrastText' }} />
            <Typography
              sx={{ fontSize: '0.6em', color: 'primary.contrastText', paddingLeft: '10px' }}
            >
              Edital: CHAMADA FUNDECT Nº 08/2020 - PPSUS
            </Typography>
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FooterComponent;
