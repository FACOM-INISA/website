import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import {
  Button,
  Card,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../styles/components/SistemaDeDados.module.css';
import OpenDataVisualization from '../components/graficoLinha';
import PieChartData from '../components/graficoTorta';
import Layout from '../components/layouts/default';
import municipios from '../data/municipios.json';
import Parto, { Predicao } from '../lib/Parto';

const SistemaDeDados: NextPage = () => {
  const options = municipios.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const [data, setData] = useState(new Array<Parto>());
  const [dataPredicao, setDataPredicao] = useState(new Array<Predicao>());

  const municipioPadrao =
    options.find((municipio) => municipio.name === 'Campo Grande') || options[0];

  const [municipio, setMunicipio] = useState<typeof municipioPadrao | null>(municipioPadrao);

  //useEffect para consumir e sincronizar dados da API de dados de partos.
  useEffect(() => {
    const body = { municipio: municipio?.id };

    fetch('api/data/consulta', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify(body),
    })
      .then((message) => message.json())
      .then((data) => {
        setData(
          data.partos.filter((element: any, index: number) => {
            element.id = index;
            element.localidade = municipios.map((municipio) => {
              if (municipio.id == element.municipio_id) {
                return municipio.name;
              }
            })[0];
            return element;
          })
        );
        setDataPredicao(
          data.predicoes.predicoes_normal.filter((element: any, index: number) => {
            element.id = index;
            element.localidade = municipios.map((municipio) => {
              if (municipio.id == element.municipio_id) {
                return municipio.name;
              }
            })[0];
            return element;
          })
        );
      });
  }, [municipio]);

  const [tipoParto, setTipoParto] = useState<'todos' | 'normal' | 'sensiveis'>('normal');

  const [expandedR, setExpandedR] = useState(true);
  const [expandedD, setExpandedD] = useState(true);

  const fakeInput = { name: '', id: 0, firstLetter: '' };

  return (
    <Layout className={styles.sistema}>
      <Grid container display="flex" flexDirection="row" flexWrap="nowrap" margin="4em auto">
        <div className={styles.main}>
          <div className={styles.sidebar}>
            <Grid className={styles.grid} alignItems="center">
              <Paper elevation={3}>
                <Card style={{ display: 'flex', flexDirection: 'column' }}>
                  <CardHeader
                    title={
                      <span style={{ textAlign: 'center', color: 'primary.main' }}>
                        Filtro por Região
                      </span>
                    }
                    action={
                      <IconButton
                        onClick={() => setExpandedR(!expandedR)}
                        aria-expanded={expandedR}
                        aria-label="show more"
                        style={{ color: 'primary.main' }}
                      >
                        {expandedR ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    }
                  />
                </Card>
                <Collapse in={expandedR} className={styles.collapse}>
                  <Typography sx={{ fontSize: '1.3em', ml: '20px', mt: '15px' }}>
                    Escolha o Município
                  </Typography>
                  <Autocomplete
                    value={municipio}
                    noOptionsText="Nenhum munícipio encontrado"
                    className={styles.busca}
                    popupIcon={<SearchIcon style={{ color: 'primary.main' }} />}
                    options={[
                      fakeInput,
                      ...options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter)),
                    ]}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.name}
                    sx={{
                      width: '90%',
                      bgColor: '#D4D5D6',
                      [`& .${autocompleteClasses.popupIndicator}`]: {
                        transform: 'none',
                      },
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(_, selected) => setMunicipio(selected || null)}
                  />
                </Collapse>
              </Paper>
            </Grid>

            {/* Segundo Card 
            
            <Grid className={styles.grid} alignItems="center">
              <Paper elevation={3}>
                <Card style={{ display: 'flex', flexDirection: 'column' }}>
                  <CardHeader
                    className={styles.cardHeader}
                    title={
                      <span style={{ textAlign: 'center', color: 'primary.main' }}>
                        Filtro de Dados
                      </span>
                    }
                    action={
                      <IconButton
                        onClick={() => setExpandedD(!expandedD)}
                        aria-expanded={expandedD}
                        aria-label="show more"
                        style={{ color: 'primary.main' }}
                      >
                        {expandedD ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    }
                  />
                </Card>
                <Collapse in={expandedD} className={styles.collapse}>
                  <List className={styles.list} dense component="div" role="list">
                    {[
                      { name: 'Partos', value: 'todos' },
                      { name: 'Partos Normais', value: 'normais' },
                      { name: 'Partos Sensíveis', value: 'sensiveis' },
                    ].map((dado) => {
                      const labelId = `checkbox-list-label-${dado.value}`;
                      return (
                        <ListItem key={dado.value} role="listitem">
                          <ListItemButton
                            role={undefined}
                            onClick={() => setTipoParto(dado.value as any)}
                            dense
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={tipoParto === dado.value}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText key={dado.value} style={{ color: 'primary.main' }}>
                              {dado.name}
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </Paper>
            </Grid>
            */}
          </div>
        </div>

        <Grid container id="graficos" justifyContent="center" rowGap="2rem" flexDirection="column">
          <Paper
            sx={{
              p: 1,
              margin: 'auto',
              width: 800,
              maxWidth: 1200,
              flexGrow: 1,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <Grid item sx={{ borderRadius: 2 }}>
              <OpenDataVisualization registros={data} predicoes={dataPredicao} tipo={tipoParto} />
            </Grid>
          </Paper>

          <Grid item container sx={{ borderRadius: 2 }}>
            <Paper
              sx={{
                p: 4,
                margin: 'auto',
                width: 800,
                maxWidth: 1200,
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
              }}
            >
              <Typography variant="h5" color="#0088B7" fontWeight={800} textAlign="center">
                {'Total de partos:'}
              </Typography>
              <Grid item xs sx={{ display: 'flex', alignItems: 'center' }}>
                <PieChartData registros={data} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};
export default SistemaDeDados;
