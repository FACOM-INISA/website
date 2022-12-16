import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image'
import Link from "next/link";
import Elements from '../utils/homeinterface';
import logo from '../public/images/ufms.png';
import styles from '../styles/components/Header.module.css';
import { Box, createTheme, Grid, ThemeProvider } from '@mui/material';

export interface ElementProps {
    elements: Elements[];
}

export const HeaderComponent: React.FC<ElementProps> = ({elements}: ElementProps) => {
    const element = elements

    return (
            <Grid className={styles.header}>
                <div className={styles.header_container}>
                    <div className={styles.logo}>
                        <Link href="/"><a><Image src={logo} alt="UFMS Logo" width={68} height={90}/></a></Link>
                    </div>

                    <span></span>

                    <div className={styles.inisa}>
                        <h1>INISA</h1>
                        <p>Instituto Integrado de Saúde</p>
                    </div>
                </div>

                <Box sx={{ flexGrow: 5, alignItems: 'center', justifyContent: 'right' }}>
                    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {element.map((item) => {
                            return (
                                <Link key={item.id} href={item.path}>{item.name}</Link>
                            )
                        })}
                    </Grid>
                </Box>
            </Grid>
    );
};

export default HeaderComponent;