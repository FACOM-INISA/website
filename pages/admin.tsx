import type { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Layout from '../components/layouts/default';
import municipios from '../data/municipios.json';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Parto from '../lib/Parto';
import CheckIcon from '@mui/icons-material/Check';

const ButtonCinza = styled(Button)({
  textTransform: 'none',
  width: '10em',
  marginRight: '10px',
  backgroundColor: '#383838',
  '&:hover': {
    backgroundColor: '#474747',
  },
});

const ButtonAzul = styled(Button)({
  textTransform: 'none',
  width: '10em',
  marginLeft: '10px',
  backgroundColor: 'primary.main',
  '&:hover': {
    backgroundColor: '#10a0cf',
  },
});

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
    valueFormatter: (params) => params.value + 2000,
  },
  {
    field: 'parto_normais',
    headerName: 'Partos Normais',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    width: 170,
  },
  {
    field: 'localidade',
    headerName: 'Localidade',
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    width: 270,
  },
];

export default function InsercaoDeDados() {
  const options = municipios.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const fakeInput = { name: '', id: 0, firstLetter: '' };
  const municipioPadrao =
    options.find((municipio) => municipio.name === 'Campo Grande') || options[0];

  const [municipio, setMunicipio] = useState<typeof municipioPadrao | null>(municipioPadrao);
  const [rows, setRows] = React.useState(new Array<Parto>());
  const [mes, setMes] = React.useState('');
  const [anos, setAnos] = React.useState('');
  const [ano, setAno] = React.useState<number[]>([]);
  const [spinner, setSpinner] = useState<boolean>(false);

  const handleChangeMes = (event: SelectChangeEvent) => {
    setMes(event.target.value);
  };
  const handleChangeAnos = (event: SelectChangeEvent) => {
    setAnos(event.target.value);
  };

  const handlePrediction = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!municipio) {
      return;
    }
    setSpinner(true);
    fetch('api/data/singleprocess', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({ idmunicipio: municipio.id }),
    }).then((response) => {
      if (response.ok) {
        return setSpinner(false);
      }
      if (response.status === 401) {
        return alert('USUÁRIO NÃO AUTORIZADO');
      }
      alert('ERRO INTERNO NO SERVIDOR');
    });
  };

  const autoUpdate = useCallback((municipio: typeof municipioPadrao) => {
    const body = { municipio: municipio.id };

    fetch('api/data/consulta', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify(body),
    })
      .then((message) => message.json())
      .then((data) => {
        setRows(
          data.partos
            .filter((element: any, index: number) => {
              element.id = index;
              element.localidade = municipios.find(
                (municipio) => element.municipio_id === municipio.id
              )?.name;

              // console.log(element);
              return element;
            })
            .sort((a: Parto, b: Parto) => b.ano - a.ano || b.mes - a.mes)
        );
      });
  }, []);

  // useEffect para consumir e sincronizar dados da API de dados de partos.
  useEffect(() => {
    if (municipio) autoUpdate(municipio);
  }, [autoUpdate, municipio]);

  // automatização da seleção de anos
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

    fetch('api/data/singleupdate', {
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
    });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Layout>
      <Grid container display="flex" flexDirection="row" flexWrap="nowrap" margin="4em auto">
        {/* Sidebar */}
        <Grid id="form" component="form" onSubmit={handleSubmit} sx={{ margin: '0 4rem' }}>
          {/* Primeiro Card */}
          <Paper elevation={3} sx={{ mb: '2em' }}>
            <Card>
              <Paper elevation={3}>
                <Typography
                  sx={{
                    color: 'primary.main',
                    fontSize: '1.5em',
                    ml: '0.7em',
                    pt: '0.3em',
                    pb: '0.3em',
                  }}
                >
                  Localidade
                </Typography>
              </Paper>
              <Stack sx={{ m: '20px' }}>
                <Typography sx={{ fontSize: '1.2em', mb: '3px' }}>Escolha o Município</Typography>
                <Autocomplete
                  id="localidade"
                  popupIcon={<SearchIcon style={{ color: 'primary.main' }} />}
                  disableClearable
                  options={[
                    fakeInput,
                    ...options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter)),
                  ]}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  value={municipio || fakeInput}
                  onChange={(event: any, newValue) => setMunicipio(newValue)}
                  sx={{
                    width: 'auto',
                    [`& .${autocompleteClasses.popupIndicator}`]: {
                      transform: 'none',
                    },
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  size="small"
                />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: '20px', mb: '5px' }}
                ></Stack>
              </Stack>
            </Card>
          </Paper>

          {/* Segundo Card */}
          <Paper elevation={3} sx={{ mb: '2em' }}>
            <Card>
              <Paper elevation={3}>
                <Typography
                  sx={{
                    color: 'primary.main',
                    fontSize: '1.5em',
                    ml: '0.7em',
                    pt: '0.3em',
                    pb: '0.3em',
                  }}
                >
                  Inserção de Dados
                </Typography>
              </Paper>
              <Grid sx={{ p: '20px' }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                >
                  <Typography sx={{ fontSize: '1.2em', alignSelf: 'center' }}>Mês</Typography>
                  <Stack width="45%">
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
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                  sx={{ m: '20px 0' }}
                >
                  <Typography sx={{ fontSize: '1.2em', alignSelf: 'center' }}>Ano</Typography>
                  <Stack width="45%">
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
                    </Select>
                  </Stack>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                  sx={{ m: '20px 0' }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.2em',
                      color: '#383838',
                      alignSelf: 'center',
                    }}
                  >
                    Partos Normais
                  </Typography>
                  <OutlinedInput
                    id="qtdnormal"
                    name="qtdnormal"
                    required
                    sx={{
                      color: '#383838',
                      textAlign: 'center',
                      width: '45%',
                    }}
                    type="number"
                    size="small"
                    inputProps={{ min: 0 }}
                  />
                </Grid>

                {/* <Grid container direction="row" justifyContent="space-between">
                  {' '}
                  <Typography sx={{ fontSize: '1.2em', color: '#383838', alignSelf: 'center' }}>
                    Partos Sensíveis
                  </Typography>
                  <OutlinedInput
                    id="qtdsensivel"
                    name="qtdsensivel"
                    required
                    sx={{
                      color: '#383838',
                      textAlign: 'center',
                      width: '30%',
                    }}
                    type="number"
                    size="small"
                  />
                </Grid> */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: '20px', mb: '5px' }}
                >
                  <ButtonCinza variant="contained" onClick={() => setMunicipio(fakeInput)}>
                    Cancelar
                  </ButtonCinza>
                  <>
                    <ButtonAzul variant="contained" onClick={handleOpen}>
                      Enviar
                    </ButtonAzul>
                    <Dialog open={open} onClose={handleClose}>
                      <Box
                        sx={{
                          background: '#edeceb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyItems: 'center',

                          p: 1.5,
                        }}
                      >
                        <CheckIcon sx={{ mr: 0.5, pt: 0.5 }} />
                        <Typography sx={{ fontSize: 18, color: '#383838' }}>Confirmação</Typography>
                      </Box>
                      <DialogContent>
                        <DialogContentText>
                          As informações inseridas estão corretas?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions sx={{ mr: 1, mb: 0.5 }}>
                        <Button sx={{ color: '#383838' }} onClick={handleClose}>
                          Cancelar
                        </Button>
                        <Button form="form" type="submit" onClick={handleClose}>
                          Confirmar
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                </Stack>
              </Grid>
            </Card>
          </Paper>
          <ButtonAzul
            variant="contained"
            sx={{ width: '100%', ml: '0px', pt: '0.3em', pb: '0.3em' }}
            onClick={handlePrediction}
          >
            {spinner ? 'Carregando' : 'Realizar predição'}
          </ButtonAzul>
        </Grid>

        {/* Tabela */}
        <Grid sx={{ width: '100%', mr: '4rem' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooterSelectedRowCount
            sx={{ background: '#FFFFFF', color: 'primary.main', boxShadow: 3, fontSize: '1em' }}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
