import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Avatar,
  Divider,
  Typography,
  Grid,
  Container,
} from '@mui/material';
import styles from '../styles/components/Integrantes.module.css';
import Lattes from '../public/images/lattes.svg';
import Linkedin from '../public/images/linkedin.svg';
import Carousel from 'react-material-ui-carousel';

interface CardItem {
  img: string;
  name: string;
  desc: string;
  linkedin: string;
  lattes: string;
}

const cardItems: CardItem[] = [
  {
    img: 'https://media.licdn.com/dms/image/C4E03AQGXsLmfbsyI7w/profile-displayphoto-shrink_800_800/0/1517635728863?e=2147483647&v=beta&t=bRUOwsQRW-KeJdPO6fpF0_xNsuIfbT_m-iotT16n6Xc',
    name: 'Nathan Aratani',
    desc: 'Docente pesquisador e Coordenador no Instituto Integrado de Saúde',
    linkedin: 'https://br.linkedin.com/in/nathan-aratani-838360b4',
    lattes: 'http://lattes.cnpq.br/4421062652834737',
  },
  {
    img: 'https://avatars.githubusercontent.com/u/2676029?v=4',
    name: 'Hudson Borges',
    desc: 'Docente pesquisador na Faculdade de Computação',
    linkedin: 'https://www.fundect.ms.gov.br',
    lattes: 'http://lattes.cnpq.br/4732229402586329',
  },
  {
    img: 'https://media.licdn.com/dms/image/C4D03AQEbR8o5UsUI_Q/profile-displayphoto-shrink_800_800/0/1657842424516?e=2147483647&v=beta&t=wfixpLea3mbWAGxsV7I2SiD-az5T5zf8VCtZZOaZZXE',
    name: 'José Pedro',
    desc: 'Estudante de Engenharia de Computação',
    linkedin: 'https://br.linkedin.com/in/josélp',
    lattes: 'http://lattes.cnpq.br/9795863779374673',
  },
  {
    img: 'https://media-exp1.licdn.com/dms/image/D4D03AQGnV-H3ix7LMA/profile-displayphoto-shrink_800_800/0/1665173752285?e=2147483647&v=beta&t=NWwEo-K8LHKXqR5QP16fiRH82s7uEiUi9DNrpcwAPj0',
    name: 'Leonardo Kazu',
    desc: 'Estudante de Ciência da Computação',
    linkedin:
      'https://br.linkedin.com/in/leonardo-kazuyoshi-takahashi-da-silva-0122b0224?trk=people-guest_people_search-card',
    lattes: ' http://lattes.cnpq.br/7507601980536823',
  },
  {
    img: 'https://media-exp1.licdn.com/dms/image/C4D03AQGqtC9rnwtBhA/profile-displayphoto-shrink_200_200/0/1649345833817?e=1676505600&v=beta&t=o4WZuF1aGWV5df_qikWdKV06orRdHgQdy2bIXyfDaH4',
    name: 'Letícia Yurie',
    desc: 'Estudante de Engenharia de Software',
    linkedin: 'https://www.linkedin.com/in/leticiayurie',
    lattes: 'https://lattes.cnpq.br',
  },
];

export const IntegranteComponent: NextPage = () => {
  return (
    <Grid
      container
      justifyContent="space-around"
      alignContent="center"
      textAlign="center"
      spacing={2}
    >
      {cardItems.map((card, index) => (
        <Grid item key={index}>
          <Card className={styles.cards}>
            <Avatar src={card.img} sx={{ width: 110, height: 110 }} alt={card.name} />

            <CardContent>
              <Typography variant="h5">{card.name}</Typography>
            </CardContent>

            <Divider style={{ width: '85%' }} />

            <CardContent>
              <Typography>{card.desc}</Typography>
            </CardContent>

            <CardContent className={styles.portfolios}>
              <CardActionArea href={card.linkedin}>
                <CardMedia>
                  <Image
                    src={Linkedin}
                    alt="Linkedin Logo"
                    width={40}
                    height={40}
                    objectFit="contain"
                  />
                </CardMedia>
              </CardActionArea>

              <CardActionArea href={card.lattes}>
                <CardMedia>
                  <Image
                    src={Lattes}
                    alt="Lattes Logo"
                    width={45}
                    height={45}
                    objectFit="contain"
                  />
                </CardMedia>
              </CardActionArea>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default IntegranteComponent;
