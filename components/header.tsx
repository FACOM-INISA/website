import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image'
import Link from "next/link";
import Elements from '../utils/homeinterface';
import logo from '../public/images/ufms.png';
import divider from '../public/images/divider.svg'
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
                    <Image src={logo} alt="UFMS Logo" width={68} height={90} />
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
                            <Link key={item.id} href={item.path}>{item.name}</Link>
                        )
                    })}
            </div>
        </div>
    );
};

export default HeaderComponent;