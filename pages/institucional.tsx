import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image'
import landing from 'images/residencia-medica.png';
import access from 'images/access.png';
import plataforma from 'images/pag-analise-de-dados.png';
import styles from '../styles/Institucional.module.css';
import HeaderComponent from '../components/header';
import IntegranteComponent from '../components/integrantes';
import { Button } from '@mui/material';
import ParceiroComponent from '../components/parceiros';
import FooterComponent from '../components/footer';

const Institucional: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Página Insititucional</title>
        <meta name="description" content="Generated by Facom-UFMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* header */}
      <HeaderComponent></HeaderComponent>

      {/* body */}
      <div className={styles.body}>
        <div className={styles.body_container_top}>
          <div className={styles.img_container}>
            <span>
              <Image src={landing} alt="UFMS Logo" width={550} height={550} />
            </span>
          </div>

          <div className={styles.ppsus}>
            <h1>Painel de Monitoramento para a Gestão do Sistema Único de Saúde</h1>
            <h1>PPSUS - MS</h1>
            <Button>
              Acessar Painel
              <Image src={access} alt="Ícone Acessar Painel" width={30} height={30} />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.body_center}>
        <h1>Conheça a Plataforma</h1>
        <div className={styles.body_center_container}>
          <h2>O Sistema Previsional para Gestão de Saúde Pública do Mato Grosso do Sul (SISPREG - MS) é uma plataforma aberta que tem como objetivo, 
            auxiliar nas decisões dos gestores de saúde de MS. Baseando-se na disponibilização de dados estaticamente obtidos por meio de modelos elaborados 
            em conjunto do Instituto de Matemática (INMA) da UFMS. </h2>
          <Image src={plataforma} alt="Imagem da Plataforma" width={700} height={500} />
        </div>            
      </div>

      <div className={styles.body_integrantes}>
        <h1>Nossos Integrantes</h1>
        <div className={styles.cards_integrantes}>
          <IntegranteComponent></IntegranteComponent>
        </div>
      </div>

      <div className={styles.body_integrantes}>
        <h1>Instituições Parceiras</h1>
        <div>
          <ParceiroComponent></ParceiroComponent>
        </div>
      </div>

      {/* footer */}
      <FooterComponent></FooterComponent>

    </div>
    
  );
};

export default Institucional;
