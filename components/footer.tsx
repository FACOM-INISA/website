import type { NextPage } from 'next';
import MyApp from '../pages/_app';
import React from 'react';
import Image from 'next/image'
import Link from "next/link";
import logo from '../public/images/ufms.png';
import styles from '../styles/components/Footer.module.css';
import { IconButton } from '@mui/material/';
import TelIcon from "@mui/icons-material/Call";
import LocIcon from "@mui/icons-material/Room";
import EditalIcon from "@mui/icons-material/Description";

const FooterComponent: NextPage = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.container_inisa}>
            <Image src={logo} alt="UFMS Logo" width={58} height={83} />
            <span></span>
            <div className={styles.inisa}>
                <h3>INISA</h3>
                <p>Instituto Integrado de Saúde</p>
            </div>
        </div>
      
      <div className={styles.container_infos}>
        <div className={styles.box_infos}>
          <IconButton style={{ color: '#FEFEFE' }}>
            <TelIcon onClick={() => window.open('https://ufms.com.br')}/>
          </IconButton>
          <p>(67) 3345-7774 / (67) 3345-7826</p>
        </div>
        <div className={styles.box_infos}>
          <IconButton style={{ color: '#FEFEFE' }}>
            <LocIcon onClick={() => window.open('https://goo.gl/maps/a3UUwjr5dUjJV5Vi9')}/> 
          </IconButton>
          <Link href='https://goo.gl/maps/a3UUwjr5dUjJV5Vi9'>Cidade Universitária, Caixa Postal 549, CEP 79070-900. Campo Grande - MS</Link>
        </div>
        <div className={styles.box_infos}>
          <IconButton style={{ color: '#FEFEFE' }}>
            <EditalIcon onClick={() => window.open('https://www.fundect.ms.gov.br/wp-content/uploads/2020/07/1-CHAMADA-FUNDECT-PPSUS-Nº-08-2020.pdf')}/> 
          </IconButton>
          <Link href='https://www.fundect.ms.gov.br/wp-content/uploads/2020/07/1-CHAMADA-FUNDECT-PPSUS-Nº-08-2020.pdf'>Edital: CHAMADA FUNDECT Nº 08/2020 - PPSUS</Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;