import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image'
import Link from "next/link";
import SvgIcon from '@mui/material/SvgIcon';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Elements from '../utils/homeinterface';
import logo from '../public/images/ufms.png';
import styles from '../styles/components/Header.module.css';

export interface ElementProps {
    elements: Elements[];
}

export const HeaderComponent: React.FC<ElementProps> = ({elements}: ElementProps) => {
    const element = elements

    return (
        <div className={styles.header}>
            <div className={styles.header_container}>
                <div className={styles.logo}>
                    <Link href="institucional"><Image src={logo} alt="UFMS Logo" width={68} height={90}/></Link>
                </div>

                <span></span>

                <div className={styles.inisa}>
                    <h1>INISA</h1>
                    <p>Instituto Integrado de Saúde</p>
                </div>
            </div>

            <div className={styles.description}>
                {element.map((item) => {
                    return (
                        <Link key={item.id} href={item.path}>
                            <a>{item.name} <Image className={styles.icone} src={item.icon} alt='ícone' height={25} width={25}/> </a>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default HeaderComponent;