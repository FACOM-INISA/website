import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image'
import logo from 'images/ufms.png';
import styles from '../styles/Institucional.module.css';

import HeaderComponent from './header';

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

      {/* footer */}
      <div className={styles.footer}></div>
    </div>
    
  );
};

export default Institucional;
