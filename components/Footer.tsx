import type { NextPage } from 'next';
import MyApp from '../pages/_app';
import React from 'react';
import Style from '../styles/components/Footer.module.css';

interface NavItem {
  title: string;
  Icon: string;
  url: string;
  id: number;
}

const navItems: NavItem[] = [
  { title: 'Telefones', Icon: '', url: 'https://materialdesignicons.com/icon/cellphone', id: 0 },
  { title: 'Localização', Icon: '', url: 'https://materialdesignicons.com/icon/map-marker', id: 1 },
  { title: 'Edital', Icon: '', url: 'https://materialdesignions.com/icon/file', id: 2 },
];

const FooterComponent: NextPage = () => {
  return (
    <footer className={Style.footer}>
      <nav>
        {navItems.map((item) => (
          <a key={item.id} href={item.url} rel="noreferrer" target="_blank">
            <span className="material-icons">{item.Icon}</span>
            <span>{item.title}</span>
          </a>
        ))}
      </nav>
    </footer>
  );
};

export default FooterComponent;
