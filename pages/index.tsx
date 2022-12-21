import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import { Button, createTheme, Grid, ThemeProvider, Typography } from '@mui/material';
import IntegranteComponent from '../components/integrantes';
import ParceiroComponent from '../components/parceiros';

import Layout from '../components/layouts/default';

import access from '../public/images/access.png';
import landing from '../public/images/residencia-medica.png';
import plataforma from '../public/images/pag-analise-de-dados.png';
import styles from '../styles/Institucional.module.css';

import NextLink from 'next/link';

const texto = `O Sistema Previsional para Gestão de Saúde Pública do Mato Grosso do Sul (SISPREG - MS) é uma plataforma aberta que tem como objetivo,
auxiliar nas decisões dos gestores de saúde de MS. Baseando-se na disponibilização de dados estaticamente obtidos por meio de modelos elaborados
em conjunto do Instituto de Matemática (INMA) da UFMS. `;

const Home: NextPage = () => {
  return (
    <Layout className={styles.center}>
      {/* body */}

      <div className={styles.landing}>
        <div className={styles.img_container}>
          <span>
            <Image src={landing} alt="UFMS Logo" width={450} height={450} layout="fixed" />
          </span>
        </div>

        <div className={styles.ppsus}>
          <h1>Painel de Monitoramento para a Gestão do Sistema Único de Saúde</h1>
          <h1>PPSUS - MS</h1>
          <NextLink href="/sistemadedados" passHref>
            <Button className={styles.botao}>
              Acessar Painel
              <Image src={access} alt="Ícone Acessar Painel" width={30} height={30} />
            </Button>
          </NextLink>
        </div>
      </div>

      <Grid
        id="1"
        className={styles.plataforma}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          className={styles.plataforma_container}
          container
          direction="column"
          alignContent="center"
          margin="4em auto"
        >
          {/* <Grid item>
            <Typography
              variant="h3"
              textAlign="center"
              sx={{
                marginBottom: '1em',
                color: 'primary.main',
                fontWeight: 'bold',
                textDecoration: 'underline',
                textUnderlineOffset: 10,
              }}
            >
              A Plataforma
            </Typography>
          </Grid> */}
          <Grid container wrap="nowrap" justifyContent="center" spacing={8} xs={12} md={10}>
            <Grid item margin="auto" xs>
              <Typography variant="h5" textAlign="center">
                {texto}
              </Typography>
            </Grid>
            <Grid item xs>
              <Image src={plataforma} alt="Imagem da Plataforma" width={700} height={500} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div id="2" className={styles.integrantes}>
        <h1>Nossos Integrantes</h1>
        <div className={styles.cards_integrantes}>
          <IntegranteComponent />
        </div>
      </div>

      <div className={styles.parcerias}>
        <h1>Instituições Parceiras</h1>
        <div>
          <ParceiroComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
