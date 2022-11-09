import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import logo from 'images/ufms.png';
import styles from '../styles/Institucional.module.css';

const HeaderComponent: NextPage = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.logo}>
          <Image src={logo} alt="UFMS Logo" width={68} height={94} />
        </div>

        <span></span>

        <div className={styles.inisa}>
          <h1>INISA</h1>
          <p>Instituto Integrado de Saúde</p>
        </div>
      </div>

      <div className={styles.description}>
        <p>O PROJETO</p>
        <p>SOBRE NÓS</p>
        <p>MAIS INFORMAÇÕES</p>
      </div>
    </div>
  );
};

export default HeaderComponent;
