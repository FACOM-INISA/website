import type { NextPage } from 'next';
import React from 'react';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Layout from '../components/layouts/default';
import municipios from '../data/municipios.json';
import {
  Button,
  Box,
  Card,
  CardHeader,
  FormControl,
  Grid,
  MenuItem,
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
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import 'dayjs/locale/pt-BR';
import { useRouter } from 'next/router';

const ButtonCinza = styled(Button)({
  textTransform: 'none',
  width: '10em',
  backgroundColor: '#383838',
  '&:hover': {
    backgroundColor: '#474747',
  },
});

const ButtonAzul = styled(Button)({
  textTransform: 'none',
  width: '10em',
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
    width: 90,
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
    field: 'parto_cesaria',
    headerName: 'Partos Sensíveis',
    type: 'string',
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

  const minDate = dayjs('2015-01-01');
  const maxDate = dayjs();

  const [tableData, setTableData] = React.useState([]);
  const [formInputData, setformInputData] = React.useState({
    data: '',
    partoNormal: '',
    partoSensivel: '',
    localidade: '',
  });

  React.useEffect(() => {
    fetch('api/consulta', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ municipio: 5000203 }),
    })
      .then((message) => {
        return message.json();
      })
      .then((data) => {
        setRows(
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
        console.log(data.partos); // tem todas as informações
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      mes: data.get('mes'),
      ano: data.get('ano'),
      localidade: data.get('localidade'),
      partoNormal: data.get('qtdnormal'),
      partoSensivel: data.get('qtdsensivel'),
    };
  };

  return (
    <Layout>
      <Grid container display="flex" flexDirection="row" flexWrap="nowrap" margin="4em auto">
        {/* Sidebar */}
        <Grid component="form" onSubmit={handleSubmit} sx={{ width: '360px', margin: '0 4rem' }}>
          {/* Primeiro Card */}
          <Paper elevation={3} sx={{ mb: '2em' }}>
            <Card>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-BR">
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
                    Data
                  </Typography>
                </Paper>
                <Grid sx={{ p: '20px' }}>
                  <Stack direction="row" spacing={'auto'}>
                    <FormControl sx={{ width: '50%' }}>
                      <Typography sx={{ fontSize: '1.2em' }}>Mês</Typography>
                      <Select
                        id="mes"
                        name="mes"
                        value={mes}
                        onChange={handleChangeMes}
                        size="small"
                      >
                        <MenuItem value="">
                          <em>Nenhum</em>
                        </MenuItem>
                        <MenuItem value={0o1}>Janeiro</MenuItem>
                        <MenuItem value={0o2}>Fevereiro</MenuItem>
                        <MenuItem value={0o3}>Março</MenuItem>
                        <MenuItem value={0o4}>Abril</MenuItem>
                        <MenuItem value={0o5}>Maio</MenuItem>
                        <MenuItem value={0o6}>Junho</MenuItem>
                        <MenuItem value={0o7}>Julho</MenuItem>
                        <MenuItem value={'08'}>Agosto</MenuItem>
                        <MenuItem value={'09'}>Setembro</MenuItem>
                        <MenuItem value={10}>Outubro</MenuItem>
                        <MenuItem value={11}>Novembro</MenuItem>
                        <MenuItem value={12}>Dezembro</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl sx={{ width: '40%' }}>
                      <Typography sx={{ fontSize: '1.2em' }}>Ano</Typography>
                      <Select
                        id="ano"
                        name="ano"
                        value={anos}
                        onChange={handleChangeAnos}
                        size="small"
                      >
                        <MenuItem value="">
                          <em>Nenhum</em>
                        </MenuItem>

                        <MenuItem value={0o1}>2018</MenuItem>
                        <MenuItem value={0o2}>2019</MenuItem>
                        <MenuItem value={0o3}>2020</MenuItem>
                        <MenuItem value={0o4}>2021</MenuItem>
                        <MenuItem value={0o5}>2022</MenuItem>
                        <MenuItem value={0o6}>2023</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
              </LocalizationProvider>
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
                  Localidade
                </Typography>
              </Paper>
              <Stack sx={{ m: '20px' }}>
                <Typography sx={{ fontSize: '1.2em', mb: '3px' }}>Escolha o Município</Typography>

                <Autocomplete
                  id="localidade"
                  popupIcon={<SearchIcon style={{ color: 'primary.main' }} />}
                  disableClearable
                  options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  value={value}
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
                  sx={{ mt: '20px', mb: '10px' }}
                >
                  <ButtonCinza variant="contained" onClick={() => setValue({ name: '' })}>
                    Limpar
                  </ButtonCinza>
                  <ButtonAzul variant="contained">Buscar</ButtonAzul>
                </Stack>
              </Stack>
            </Card>
          </Paper>

          {/* Terceiro Card */}
          <Paper elevation={3}>
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
                  Partos
                </Typography>
              </Paper>
              <Stack sx={{ m: '20px' }}>
                <FormControl>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignContent="center"
                    sx={{ mb: '20px' }}
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
                        width: '30%',
                      }}
                      type="number"
                      size="small"
                    />
                  </Grid>

                  <Grid container direction="row" justifyContent="space-between">
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
                  </Grid>
                </FormControl>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: '20px', mb: '10px' }}
                >
                  <ButtonCinza variant="contained" onClick={() => setValue({ name: '' })}>
                    Cancelar
                  </ButtonCinza>
                  <ButtonAzul variant="contained" type="submit">
                    Enviar
                  </ButtonAzul>
                </Stack>
              </Stack>
            </Card>
          </Paper>
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
