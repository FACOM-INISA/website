import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image'
import Card from '@mui/material/Card';
import { CardMedia, CardActionArea } from '@mui/material';
import styles from '../styles/Parceiros.module.css';
import fundect from '../images/fundect.png';
import ufms from '../images/uf.png';
import sus from '../images/sus.png';

const ParceiroComponent: NextPage = () => {
    return (
        <Card className={styles.parceiros}>
            <CardActionArea 
            className={styles.cardactionarea}
            href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwj229baiq77AhVijZUCHVqQBjIQFnoECBMQAQ&url=https%3A%2F%2Fwww.fundect.ms.gov.br%2F&usg=AOvVaw2UQ_EY60TyY4PYMqK-6hs7">
                <CardMedia>
                    <Image src={fundect}
                        alt = "Lattes Logo"
                        width={250}
                        height={250}
                        objectFit="contain"
                    />
                </CardMedia>
            </CardActionArea>
        </Card>
    );
};

export default ParceiroComponent;
