import type { NextPage } from 'next';
import React from 'react';
import { Card, CardMedia, CardActionArea } from '@mui/material';
import styles from '../styles/components/Parceiros.module.css';
interface CardItem {
    id: number;
    img: string;
    name: string;
    url: string;
}

const cardItems: CardItem[] = [
    {
        id: 1,
        img: 'https://www.ufms.br/wp-content/uploads/2021/01/LOGO-FUNDECT-COLORIDA-2.png',
        name: 'Fundect',
        url: 'https://www.fundect.ms.gov.br',
    },
    {
        id: 2,
        img: 'https://www.fundect.ms.gov.br/wp-content/webpc-passthru.php?src=http://www.fundect.ms.gov.br/wp-content/uploads/2019/06/ufms_logo_positivo_assinatura_vertical_rgb.png&nocache=1',
        name: 'UFMS',
        url: 'https://www.ufms.br',
    },
    {
        id: 3,
        img: 'https://opendatasus.saude.gov.br/uploads/group/2022-01-11-181122.577845logoms.png',
        name: 'SUS',
        url: 'https://www.gov.br/pt-br/servicos/acessar-a-plataforma-movel-de-servicos-digitais-do-ministerio-da-saude',
    }
];


const ParceiroComponent: NextPage = () => {
    return (
        <div className={styles.cards_container}>
            {cardItems.map((card) => (
                <Card className={styles.parceiros} key={card.id}>
                    <CardActionArea 
                        href = {card.url}
                        style={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                    <CardMedia
                        style={{
                            width: "auto",
                            maxHeight: "8rem"
                        }}
                        component="img"
                        image={card.img}
                        alt = {card.name}
                    />
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
};

export default ParceiroComponent;
