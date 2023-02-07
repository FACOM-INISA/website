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
  Stack,
  OutlinedInput,
  MenuItem,
  Select,
  TableSortLabel,
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
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';

const columns: GridColDef[] = [
  {
    field: 'mes',
    headerName: 'Mês',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    width: 90,
  },
  {
    field: 'ano',
    headerName: 'Ano',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    width: 100,
    valueFormatter: (params: { value: number }) => params.value + 2000,
  },
  {
    field: 'pred',
    headerName: 'Predições de partos Normais',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    width: 240,
  },

  {
    field: 'upper',
    headerName: 'Limite Superior',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    width: 150,
  },
  {
    field: 'lower',
    headerName: 'Limite Inferior',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    width: 150,
  },
];

export default function SistemaDeDados() {
  const options = municipios.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const [mes, setMes] = React.useState('');
  const [anos, setAnos] = React.useState('');
  const [ano, setAno] = React.useState<number[]>([]);
  const [rows, setRows] = React.useState(new Array<Predicao>());
  const [data, setData] = useState(new Array<Parto>());
  const [dataPredicao, setDataPredicao] = useState(new Array<Predicao>());

  const handleChangeMes = (event: SelectChangeEvent) => {
    setMes(event.target.value);
  };

  const handleChangeAnos = (event: SelectChangeEvent) => {
    setAnos(event.target.value);
  };

  const municipioPadrao =
    options.find((municipio) => municipio.name === 'Campo Grande') || options[0];

  const [municipio, setMunicipio] = useState<typeof municipioPadrao | null>(municipioPadrao);

  const fakeInput = { name: '', id: 0, firstLetter: '' };

  //useEffect para consumir e sincronizar dados da API de dados de partos.

  useEffect(() => {
    const minDate = dayjs('2006');
    const maxDate = dayjs();
    const diff = maxDate.diff(minDate, 'year');
    let aux: number[] = [];
    for (let i = 6; i < diff + 7; i++) {
      aux.push(i);
    }
    setAno(aux);
  }, []);

  useEffect(() => {
    const body = { municipio: municipio?.id };
    if (!municipio) {
      return;
    }

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
        setRows(
          data.predicoes.predicoes_normal
            .filter((element: any, index: number) => {
              element.id = index;
              element.localidade = municipios.find(
                (municipio) => element.municipio_id === municipio.id
              )?.name;

              /* console.log(element); */
              return element;
            })
            .sort((a: Parto, b: Parto) => b.ano - a.ano || b.mes - a.mes)
        );
      });
    console.log(rows);
  }, [municipio]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!municipio || municipio.id === 0) return;
    const body = {
      mes: data.get('mes'),
      ano: data.get('ano'),
      normal: data.get('qtdnormal'),
      cesaria: data.get('qtdnormal'),
      total: +data.get('qtdnormal')! * 2,
      idmunicipio: municipio.id,
    };

    /* fetch('api/data/singleupdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        return autoUpdate(municipio);
      }
      if (response.status === 401) {
        return alert('USUÁRIO NÃO AUTORIZADO');
      }
      alert('FALHA AO INSERIR OS DADOS');
    }); */
  };

  const [tipoParto, setTipoParto] = useState<'todos' | 'normal' | 'sensiveis'>('normal');

  return (
    <Layout className={styles.sistema}>
      <Grid
        container
        display="flex"
        onSubmit={handleSubmit}
        flexDirection="row"
        flexWrap="nowrap"
        margin="2em auto"
        component="form"
        width={'100%'}
      >
        <div className={styles.main}>
          <Grid className={styles.sidebar}>
            <Grid className={styles.grid} alignItems="center">
              <Paper elevation={3}>
                <Card style={{ display: 'flex', flexDirection: 'column' }}>
                  <CardHeader
                    title={
                      <span style={{ textAlign: 'center', color: '#0088B7', fontWeight: 'bolder' }}>
                        Filtro por Região
                      </span>
                    }
                  />
                </Card>

                <Autocomplete
                  value={municipio || fakeInput}
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
                    paddingBottom: '20px',
                  }}
                  renderInput={(params) => <TextField {...params} label="Buscar por município" />}
                  /* onChange={(_, selected) => setMunicipio(fakeInput || selected)} */
                  onChange={(event: any, newValue) => setMunicipio(newValue)}
                />
              </Paper>
            </Grid>

            {/* Filtro por data

            <Grid className={styles.grid} alignItems="center">
              <Paper elevation={3}>
                <Card style={{ display: 'flex', flexDirection: 'column' }}>
                  <CardHeader
                    title={
                      <span style={{ textAlign: 'center', color: '#0088B7', fontWeight: 'bolder' }}>
                        Filtro por Data
                      </span>
                    }
                  />
                </Card>
                <Grid sx={{ p: '20px' }}>
                  <Stack direction="row" spacing={'auto'}>
                    <Stack sx={{ width: '50%' }}>
                      <Typography sx={{ fontSize: '1.2em' }}>Mês</Typography>
                      <Select
                        id="mes"
                        name="mes"
                        value={mes}
                        onChange={handleChangeMes}
                        size="small"
                        required
                      >
                        <MenuItem value={0o1}>Janeiro</MenuItem>
                        <MenuItem value={0o2}>Fevereiro</MenuItem>
                        <MenuItem value={0o3}>Março</MenuItem>
                        <MenuItem value={0o4}>Abril</MenuItem>
                        <MenuItem value={0o5}>Maio</MenuItem>
                        <MenuItem value={0o6}>Junho</MenuItem>
                        <MenuItem value={'7'}>Julho</MenuItem>
                        <MenuItem value={'08'}>Agosto</MenuItem>
                        <MenuItem value={'09'}>Setembro</MenuItem>
                        <MenuItem value={10}>Outubro</MenuItem>
                        <MenuItem value={11}>Novembro</MenuItem>
                        <MenuItem value={12}>Dezembro</MenuItem>
                      </Select>
                    </Stack>
                    <Stack sx={{ width: '40%' }}>
                      <Typography sx={{ fontSize: '1.2em' }}>Ano</Typography>
                      <Select
                        id="ano"
                        name="ano"
                        value={anos}
                        onChange={handleChangeAnos}
                        size="small"
                        required
                      >
                        {ano.map((element, index) => (
                          <MenuItem key={index} value={element}>
                            {element + 2000}
                          </MenuItem>
                        ))}
                        <MenuItem value={'19'}>2000</MenuItem>
                      </Select>
                    </Stack>
                  </Stack>
                </Grid>
              </Paper>
            </Grid> */}

            {/* Filtro de Partos
            
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
          </Grid>
        </div>

        <Grid container id="graficos" justifyContent="center" rowGap="2rem" flexDirection="column">
          <Paper
            sx={{
              p: 4,
              margin: 'auto',
              width: 800,
              maxWidth: 1200,
              flexGrow: 1,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <Typography variant="h5" color="#0088B7" fontWeight={800} textAlign="center">
              {'Dados do munícipio: ' +
                (municipio?.name === undefined ? municipioPadrao.name : municipio.name)}
            </Typography>
            <Grid item sx={{ borderRadius: 2 }}>
              <OpenDataVisualization registros={data} predicoes={dataPredicao} tipo={tipoParto} />
            </Grid>
          </Paper>

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
              {'Detalhamento das predições'}
            </Typography>

            <Grid sx={{ width: '100%', mr: '2rem', paddingTop: '1rem' }}>
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                hideFooterSelectedRowCount
                hideFooter
                sx={{
                  background: '#FFFFFF',
                  color: 'primary.main',
                  boxShadow: 3,
                  fontSize: '1em',
                }}
              />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
