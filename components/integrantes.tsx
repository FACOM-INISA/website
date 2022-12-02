import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image'
import { Card, CardActionArea, CardContent, CardMedia, Avatar, Divider, Typography } from '@mui/material';
import styles from '../styles/components/Integrantes.module.css';
import Lattes from '../public/images/lattes.svg';
import Linkedin from '../public/images/linkedin.svg';

interface CardItem {
    id: number;
    img: string;
    name: string;
    desc: string;
    linkedin: string;
    lattes: string;
}

const cardItems: CardItem[] = [
    {
        id: 1,
        img: '../public/images/leticia.jpeg',
        name: 'Nathan Aratani',
        desc: 'Docente pesquisador e Coordenador no Instituto Integrado de Saúde',
        linkedin: 'https://br.linkedin.com/in/nathan-aratani-838360b4',
        lattes: 'http://lattes.cnpq.br/4421062652834737'
    },
    {
        id: 2,
        img: '../public/images/leticia.jpeg',
        name: 'Hudson Borges',
        desc: 'Docente pesquisador na Faculdade de Computação',
        linkedin: 'https://www.fundect.ms.gov.br',
        lattes: 'http://lattes.cnpq.br/4732229402586329'
    },
    {
        id: 3,
        img: '../public/images/leticia.jpeg',
        name: 'José Pedro',
        desc: 'Estudante de Engenharia de Computação',
        linkedin: 'https://br.linkedin.com/in/josélp',
        lattes: 'http://lattes.cnpq.br/9795863779374673'
    },
    {
        id: 4,
        img: '../public/images/leticia.jpeg',
        name: 'Leonardo Kazu',
        desc: 'Estudante de Ciência da Computação',
        linkedin: 'https://br.linkedin.com/in/leonardo-kazuyoshi-takahashi-da-silva-0122b0224?trk=people-guest_people_search-card',
        lattes: ' http://lattes.cnpq.br/7507601980536823'
    },
    {
        id: 5,
        img: '../public/images/leticia.jpeg',
        name: 'Letícia Yurie',
        desc: 'Estudante de Engenharia de Software',
        linkedin: 'https://br.linkedin.com/in/leticiayurie',
        lattes: 'https://lattes.cnpq.br'
    }
];


export const IntegranteComponent: NextPage = () => {
    return (
        <div className={styles.cards_container}>
            {cardItems.map((card) => (
                <Card className={styles.cards} key={card.id}>
                    <Avatar
                        src={card.img}  
                        sx={{ width: 110, height: 110 }} 
                        alt={card.name} />

                    <CardContent>
                        <Typography variant="h5">{card.name}</Typography>
                    </CardContent>
                            
                    <Divider style={{width:'80%'}} />

                    <CardContent>
                        <Typography>{card.desc}</Typography>
                    </CardContent>
                            
                    <CardContent className={styles.portfolios}>
                        <CardActionArea href={card.linkedin}>
                            <CardMedia>
                                <Image src={Linkedin}
                                    alt = "Linkedin Logo"
                                    width={40}
                                    height={40}
                                    objectFit="contain"
                                />
                            </CardMedia>
                        </CardActionArea>

                        <CardActionArea href={card.lattes}>
                            <CardMedia>
                                <Image src={Lattes}
                                    alt = "Lattes Logo"
                                    width={45}
                                    height={45}
                                    objectFit="contain"
                                />
                            </CardMedia>
                        </CardActionArea>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default IntegranteComponent;