import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Box, Button, Grid, Typography } from '@mui/material';
import IntegranteComponent from '../components/integrantes';
import ParceiroComponent from '../components/parceiros';
import Layout from '../components/layouts/default';

import access from '../public/images/access.png';
import landing from '../public/images/residencia-medica.png';
import plataforma from '../public/images/pag-analise-de-dados.png';
import styles from '../styles/Institucional.module.css';

const texto = `O Sistema Previsional para Gestão de Saúde Pública do Mato Grosso do Sul (SISPREG - MS) 
               é uma plataforma aberta que tem como objetivo, auxiliar nas decisões dos gestores de saúde de MS. 
               Baseando-se na disponibilização de dados estaticamente obtidos por meio de modelos elaborados
               em conjunto do Instituto de Matemática (INMA) da UFMS. `;

const Home: NextPage = () => {
  return (
    <Layout>
      {/* Landing */}
      <Grid
        className={styles.landing}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gridRow: '100px',
          alignItems: 'center',
          margin: '3em 0',
        }}
      >
        <Box
          sx={{
            padding: '10px',
            marginLeft: '10em',
            minHeight: '300',
            minWidth: '300',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '15px',
            backgroundColor: 'primary.main',
          }}
        >
          <Image className={styles.imagem} src={landing} alt="UFMS Logo" />
        </Box>

        <Box
          sx={{
            width: '100%',
            height: '20em',
            backgroundColor: 'secondary.main',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Grid
            item
            sx={{
              paddingTop: '2.5em',
              marginRight: '10em',
              textAlign: 'right',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '10px' }}>
              Painel de Monitoramento para a Gestão do Sistema Único de Saúde
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', paddingBottom: '30px' }}>
              PPSUS - MS
            </Typography>
            <NextLink href="/sistemadedados" passHref>
              <Button
                sx={{
                  width: '360px',
                  height: '72px',
                  justifyContent: 'space-evenly',
                  backgroundColor: '#bfbfbf',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '4px',
                  fontFamily: 'Lato',
                  fontSize: '30px',
                  fontWeight: '900',
                  color: 'black',
                  textTransform: 'none',
                }}
              >
                Acessar Painel
                <Image src={access} alt="Ícone Acessar Painel" width={30} height={30} />
              </Button>
            </NextLink>
          </Grid>
        </Box>
      </Grid>

      {/* Plataforma */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: '#afafaf', p: '3em 0' }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '40px' }}>
          Conheça a Plataforma
        </Typography>
        <Grid container xs={10}>
          <Grid container wrap="nowrap" spacing={7}>
            <Grid item xs>
              <Typography sx={{ fontSize: '1.5em', textAlign: 'justify' }}>{texto}</Typography>
            </Grid>
            <Grid item xs>
              <Image src={plataforma} alt="Imagem da Plataforma" width={700} height={500} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Integrantes */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ p: '3em 10em' }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '40px' }}>
          Nossos Integrantes
        </Typography>
        <Grid item>
          <IntegranteComponent />
        </Grid>
      </Grid>

      {/* Parceiros */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ p: '3em 10em', mb: '20px' }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '40px' }}>
          Instituições Parceiras
        </Typography>
        <ParceiroComponent />
      </Grid>
    </Layout>
  );
};

export default Home;
