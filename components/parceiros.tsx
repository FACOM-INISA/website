import type { NextPage } from 'next';
import React from 'react';
import { Card, CardMedia, CardActionArea, Grid, styled } from '@mui/material';
import styles from '../styles/components/Parceiros.module.css';
interface CardItem {
  img: string;
  name: string;
  url: string;
}

const cardItems: CardItem[] = [
  {
    img: 'https://www.ufms.br/wp-content/uploads/2021/01/LOGO-FUNDECT-COLORIDA-2.png',
    name: 'Fundect',
    url: 'https://www.fundect.ms.gov.br',
  },
  {
    img: 'https://www.fundect.ms.gov.br/wp-content/webpc-passthru.php?src=http://www.fundect.ms.gov.br/wp-content/uploads/2019/06/ufms_logo_positivo_assinatura_vertical_rgb.png&nocache=1',
    name: 'UFMS',
    url: 'https://www.ufms.br',
  },
  {
    img: 'https://opendatasus.saude.gov.br/uploads/group/2022-01-11-181122.577845logoms.png',
    name: 'SUS',
    url: 'https://www.gov.br/pt-br/servicos/acessar-a-plataforma-movel-de-servicos-digitais-do-ministerio-da-saude',
  },
];

const StyledCardActionArea = styled(CardActionArea)(
  ({ theme }) => `
    .MuiCardActionArea-focusHighlight {
        background: transparent;
    }
`
);

const ParceiroComponent: NextPage = () => {
  return (
    <Grid container justifyContent="space-around" spacing={5}>
      {cardItems.map((card, index) => (
        <Grid item key={index} xs>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              height: '270px',
              width: '270px',
              backgroundColor: 'primary.contrastText',
              border: '2px solid #a8a8a8',
              borderRadius: '500px',
              margin: '0 10px',
            }}
            key={index}
          >
            <StyledCardActionArea>
              <CardActionArea
                href={card.url}
                target="_blank"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <CardMedia
                  style={{
                    width: 'auto',
                    maxHeight: '7em',
                  }}
                  component="img"
                  image={card.img}
                  alt={card.name}
                />
              </CardActionArea>
            </StyledCardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ParceiroComponent;
