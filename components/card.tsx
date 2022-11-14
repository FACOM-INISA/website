import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import styles from '../styles/Card.module.css';
import lattes from '../images/lattes.svg';
import linkedin from '../images/linkedin.svg';
import { Avatar, CardHeader } from '@mui/material';


const CardComponent: NextPage = () => {
    return (
        <Card className={styles.cards}>
            <CardMedia>
                <Avatar
                    src="/broken-image.jpg"
                    sx={{ width: 165, height: 165 }}/>
            </CardMedia>

            <CardContent>
                <Typography variant="h4">Nathan Aratani</Typography>
            </CardContent>

            <Divider variant="middle" />

            <CardContent>
                <Typography variant="h6">Docente pesquisador e Coordenador no Instituto Integrado de Saúde</Typography>
                <Typography variant="h6">INISA - UFMS</Typography>
            </CardContent>

            <CardContent className={styles.portfolios}>
                <CardActionArea href="https://linkedin.com">
                    <CardMedia>
                        <Image src={linkedin}
                            alt = "Linkedin Logo"
                            width={50}
                            height={50}
                            objectFit="contain"
                        />
                    </CardMedia>
                    <Typography>Linkedin</Typography>
                </CardActionArea>

                <CardActionArea href="https://lattes.cnpq.br">
                    <CardMedia>
                        <Image src={lattes}
                            alt = "Lattes Logo"
                            width={60}
                            height={60}
                            objectFit="contain"
                        />
                    </CardMedia>
                    <Typography>Lattes</Typography>
                </CardActionArea>
            </CardContent>
        </Card>
    );
};

export default CardComponent;
