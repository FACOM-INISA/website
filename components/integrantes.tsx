import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image'
import { Card, CardActionArea, CardContent, CardMedia, Avatar, Divider, Typography } from '@mui/material';
import styles from '../styles/components/Integrantes.module.css';
import Lattes from '../images/lattes.svg';
import Linkedin from '../images/linkedin.svg';
import Github from '../images/github.svg';

interface CardItem {
    id: number;
    img: string;
    name: string;
    desc: string;
    linkedin: string;
    lattes: string;
    git: string;
}

const cardItems: CardItem[] = [
    {
        id: 1,
        img: '../images/leticia.jpeg',
        name: 'Nathan Aratani',
        desc: 'Docente pesquisador e Coordenador no Instituto Integrado de Saúde (INISA) - UFMS',
        linkedin: 'https://br.linkedin.com/in/nathan-aratani-838360b4',
        lattes: 'http://lattes.cnpq.br/4421062652834737',
        git: ''
    },
    {
        id: 2,
        img: '../images/leticia.jpeg',
        name: 'Hudson Borges',
        desc: 'Docente pesquisador na Faculdade de Computação - UFMS',
        linkedin: 'https://www.fundect.ms.gov.br',
        lattes: 'http://lattes.cnpq.br/4732229402586329',
        git: ''
    },
    {
        id: 3,
        img: '../images/leticia.jpeg',
        name: 'José Pedro',
        desc: 'Estudante de Engenharia de Computação',
        linkedin: 'https://www.fundect.ms.gov.br',
        lattes: 'https://lattes.cnpq.br',
        git: ''
    },
    {
        id: 4,
        img: '../images/leticia.jpeg',
        name: 'Leonardo Kazu',
        desc: 'Estudante de Ciência da Computação',
        linkedin: 'https://br.linkedin.com/in/leonardo-kazuyoshi-takahashi-da-silva-0122b0224?trk=people-guest_people_search-card',
        lattes: 'https://lattes.cnpq.br',
        git: ''
    },
    {
        id: 5,
        img: '../images/leticia.jpeg',
        name: 'Letícia Yurie',
        desc: 'Estudante de Engenharia de Software',
        linkedin: 'https://www.fundect.ms.gov.br',
        lattes: 'https://lattes.cnpq.br',
        git: ''
    }
];


const IntegranteComponent: NextPage = () => {
    return (
        <div className={styles.cards_container}>
            {cardItems.map((card) => (
                <Card className={styles.cards} key={card.id}>
                    <Avatar src={card.img}  sx={{ width: 160, height: 160 }} />

                    <CardContent>
                        <Typography variant="h4">{card.name}</Typography>
                    </CardContent>
                            
                    <Divider variant="middle" />

                    <CardContent>
                        <Typography variant="h6">{card.desc}</Typography>
                    </CardContent>
                            
                    <CardContent className={styles.portfolios}>
                        <CardActionArea href={card.linkedin}>
                            <CardMedia>
                                <Image src={Linkedin}
                                    alt = "Linkedin Logo"
                                    width={50}
                                    height={50}
                                    objectFit="contain"
                                />
                            </CardMedia>
                            <Typography>Linkedin</Typography>
                        </CardActionArea>

                        <CardActionArea href={card.lattes}>
                            <CardMedia>
                                <Image src={Lattes}
                                    alt = "Lattes Logo"
                                    width={60}
                                    height={60}
                                    objectFit="contain"
                                />
                            </CardMedia>
                            <Typography>Lattes</Typography>
                        </CardActionArea>

                        <CardActionArea href={card.git}>
                            <CardMedia>
                                <Image src={Github}
                                    alt = "Github Logo"
                                    width={60}
                                    height={60}
                                    objectFit="contain"
                                />
                            </CardMedia>
                            <Typography>Github</Typography>
                        </CardActionArea>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default IntegranteComponent;