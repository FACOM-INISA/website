import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image'
import logo from 'images/ufms.png';
import { navLinks } from "../utils/data";
import Link from "next/link";
import styles from '../styles/Header.module.css';

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
          {/*
          <nav>
            {navLinks.map((link, index) => {
              return (
                <ul>
                  <Link href={link.path}>
                    <li key={index}>{link.name}</li>
                  </Link>
                </ul>
              );
            })}
          </nav> 
          */}
        </div>
      </div>
    );
  };
  
  export default HeaderComponent;
  