import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image'
import logo from 'images/ufms.png';
import styles from '../styles/Institucional.module.css';

const HeaderComponent: NextPage = () => {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.inisa}>
            <div className={styles.logo}>
              <Image src={logo} alt="UFMS Logo" width={70} height={90} />
            </div>
            <h1 className="page-header">INISA</h1>
            <p>Instituto Integrado de Saúde</p>
          </div>
  
          <div className={styles.description}>
            <p>O PROJETO</p>
            <p>SOBRE NÓS</p>
            <p>MAIS INFORMAÇÕES</p>
          </div>
        </div>
      </div>
      
    );
  };
  
  export default HeaderComponent;
  