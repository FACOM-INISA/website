import type { NextPage } from 'next';
import MyApp from '../pages/_app';
import React from 'react';
import Image from 'next/image'
import logo from 'images/ufms.png';
import { IconButton } from '@mui/material/';
import TelIcon from "@mui/icons-material/Call";
import LocIcon from "@mui/icons-material/Room";
import EditalIcon from "@mui/icons-material/Description";
import styles from '../styles/components/Footer.module.css';
interface NavItem {
  title: string;
  Icon: string;
  url: string;
  id: number;
}
const navItems: NavItem[] = [
  { title: 'Telefones', Icon: '', url: 'https://materialui.co/icon/call', id: 0 },
  { title: 'Localização', Icon: '', url: 'https://materialui.co/icon/room', id: 1 },
  { title: 'Edital', Icon: '', url: 'https://materialui.co/icon/description', id: 2 },
];

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

    {/*
      <nav>
        {navItems.map((item) => (
          <a key={item.id} href={item.url} rel="noreferrer" target="_blank">
            <span className="material-icons">{item.Icon}</span>
            <span>{item.title}</span>
          </a>
        ))}
      </nav>
      */}
      
      <div className={styles.container_infos}>
        <div className={styles.box_infos}>
          <IconButton style={{ color: '#FEFEFE' }}>
            <TelIcon onClick={() => window.open('https://goo.gl/maps/a3UUwjr5dUjJV5Vi9')}/>
          </IconButton>
          <p>(67) 3345-7774 / (67) 3345-7826</p>
        </div>
        <div className={styles.box_infos}>
          <IconButton style={{ color: '#FEFEFE' }}>
            <LocIcon onClick={() => window.open('https://goo.gl/maps/a3UUwjr5dUjJV5Vi9')}/> 
          </IconButton>
          <p>Cidade Universitária, Caixa Postal 549, CEP 79070-900. Campo Grande - MS</p>
        </div>
        <div className={styles.box_infos}>
          <IconButton style={{ color: '#FEFEFE' }}>
            <EditalIcon onClick={() => window.open('https://www.fundect.ms.gov.br/wp-content/uploads/2020/07/1-CHAMADA-FUNDECT-PPSUS-Nº-08-2020.pdf')}/> 
          </IconButton>
          <p>Edital: CHAMADA FUNDECT Nº 08/2020 - PPSUS</p>
        </div>
      </div>
    </footer>
  );
};
export default FooterComponent;