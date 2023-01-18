import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
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
  Box,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../styles/components/SistemaDeDados.module.css';
import OpenDataVisualization from '../components/graficoLinha';
import PieChartData from '../components/graficoTorta';
import Layout from '../components/layouts/default';
import municipios from '../data/municipios.json';
import { Body } from 'node-fetch';
import { props } from 'bluebird';
import Parto, { Predicao } from '../lib/Parto';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const dados = [
  { name: 'Partos', id: 0 },
  { name: 'Partos Normais', id: 1 },
  { name: 'Partos Sensíveis', id: 2 },
];

const SistemaDeDados: NextPage = () => {
  const options = municipios.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const [data, setData] = React.useState(new Array<Parto>());

  const [dataPredicao, setDataPredicao] = React.useState(new Array<Predicao>());

  const [rows, setRows] = React.useState([]);

  const [value, setValue] = React.useState<any>('');

  const [mes, setMes] = React.useState('');
  const handleChangeMes = (event: SelectChangeEvent) => {
    setMes(event.target.value);
  };
  const [anos, setAnos] = React.useState('');
  const handleChangeAnos = (event: SelectChangeEvent) => {
    setAnos(event.target.value);
  };
  const [tableData, setTableData] = React.useState([]);
  const [formInputData, setformInputData] = React.useState({
    data: '',
    partoNormal: '',
    partoSensivel: '',
    localidade: '',
  });

  //useEffect para consumir e sincronizar dados da API de dados.

  React.useEffect(() => {
    const body = {
      municipio: 5000203,
    };

    fetch('api/consulta', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(body),
    })
      .then((message) => {
        return message.json();
      })

      .then((data) => {
        setData(
          data.partos.filter((element: any, index: number) => {
            element.id = index;
            element.localidade = municipios.map((municipio) => {
              if (municipio.id == element.municipio_id) {
                return municipio.name;
              }
            })[0];
            console.log(element);
            return element;
          })
        );
        /* setDataPredicao(
          dataPredicao.predicoes.filter((element: any, index: number) => {
            element.id = index;
            element.localidade = municipios.map((municipio) => {
              if (municipio.id == element.municipio_id) {
                return municipio.name;
              }
            })[0];
            console.log(element);
            return element;
          })
        ); */
        console.log(data);
      });
  }, []);

  //useEffect para consumir e sincronizar dados da API de predição.

  /* React.useEffect(() => {
    const body = {
      municipio: 5000203,
    };

    fetch('api/consulta', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(body),
    })
      .then((message) => {
        return message.json();
      })

      .then((dataPredicao) => {
        setDataPredicao(
          dataPredicao.predicoes.filter((element: any, index: number) => {
            element.id = index;
            element.localidade = municipios.map((municipio) => {
              if (municipio.id == element.municipio_id) {
                return municipio.name;
              }
            })[0];
            console.log(element);
            return element;
          })
        );
        console.log(dataPredicao);
      });
  }, []); */

  const [checked, setChecked] = React.useState([0]);
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const [expandedR, setExpandedR] = React.useState(true);
  const handleExpandClickR = () => {
    setExpandedR(!expandedR);
  };
  const [expandedD, setExpandedD] = React.useState(true);
  const handleExpandClickD = () => {
    setExpandedD(!expandedD);
  };
  console.log(value);

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
                        onClick={handleExpandClickR}
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
                  <Autocomplete
                    className={styles.busca}
                    popupIcon={<SearchIcon style={{ color: 'primary.main' }} />}
                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.name}
                    sx={{
                      width: '90%',
                      bgColor: '#D4D5D6',
                      [`& .${autocompleteClasses.popupIndicator}`]: {
                        transform: 'none',
                      },
                    }}
                    renderInput={(params) => <TextField {...params} label="Buscar por município" />}
                  />

                  <div className={styles.botoes}>
                    <Button variant="contained" onClick={() => setValue({ name: '' })}>
                      Limpar
                    </Button>
                    <Button variant="contained">Buscar</Button>
                  </div>
                </Collapse>
              </Paper>
            </Grid>

            {/* Segundo Card */}
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
                        onClick={handleExpandClickD}
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
                    {dados.map((dado) => {
                      const labelId = `checkbox-list-label-${dado.id}`;
                      return (
                        <ListItem key={dado.id} role="listitem">
                          <ListItemButton role={undefined} onClick={handleToggle(dado.id)} dense>
                            <ListItemIcon>
                              <Checkbox
                                checked={checked.indexOf(dado.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText key={dado.id} style={{ color: 'primary.main' }}>
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
          </div>
        </div>

        <Grid container id="graficos" justifyContent="center" rowGap="2em" flexDirection="column">
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
              <OpenDataVisualization registros={data} predicoes={dataPredicao} />
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
                Percentual de partos
              </Typography>
              <Grid item xs minWidth={800}>
                <PieChartData />
              </Grid>

              <Grid item container xs direction={'row'}>
                <Grid item xs={6}>
                  <Typography variant="h5" color="#0088B7" fontWeight={800} textAlign="center">
                    Partos Normais:
                  </Typography>
                  <Typography variant="h5" color="#0088B7" fontWeight={800} textAlign="center">
                    {1000}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="h5" color="#0088B7" fontWeight={800} textAlign="center">
                    Partos Sensíveis:
                  </Typography>
                  <Typography variant="h5" color="#0088B7" fontWeight={800} textAlign="center">
                    {400}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};
export default SistemaDeDados;
