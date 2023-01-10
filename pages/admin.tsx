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
  width: '140px',
  backgroundColor: '#383838',
  '&:hover': {
    backgroundColor: '#474747',
  },
});

const ButtonAzul = styled(Button)({
  width: '140px',
  backgroundColor: 'primary.main',
  '&:hover': {
    backgroundColor: '#10a0cf',
  },
});

const columns: GridColDef[] = [
  {
    field: 'data',
    headerName: 'Data (MM/AA)',
    type: 'date',
    editable: true,
    headerAlign: 'center',
    align: 'center',
    width: 150,
  },
  {
    field: 'partoNormal',
    headerName: 'Partos Normais',
    type: 'number',
    editable: true,
    headerAlign: 'center',
    align: 'center',
    width: 170,
  },
  {
    field: 'partoSensivel',
    headerName: 'Partos Sensíveis',
    type: 'number',
    editable: true,
    headerAlign: 'center',
    align: 'center',
    width: 170,
  },
  {
    field: 'localidade',
    headerName: 'Localidade',
    type: 'string',
    editable: true,
    headerAlign: 'center',
    align: 'center',
    width: 270,
  },
];

const rows = [
  {
    id: 0,
    data: '03/2022',
    partoNormal: 300,
    partoSensivel: 500,
    localidade: 'Campo Grande - MS',
  },
  { id: 1, data: '05/2021', partoNormal: 500, partoSensivel: 900, localidade: 'Miranda - MS' },
  { id: 2, data: '01/2023', partoNormal: 310, partoSensivel: 502, localidade: 'Dourados - MS' },
];

export default function InsercaoDeDados() {
  const options = municipios.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const [value, setValue] = React.useState<any>('');

  const [mes, setMes] = React.useState('');
  const handleChangeMes = (event: SelectChangeEvent) => {
    setMes(event.target.value);
  };

  const [anos, setAnos] = React.useState('');
  const handleChangeAnos = (event: SelectChangeEvent) => {
    setAnos(event.target.value);
  };

  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const handleChangeDate = (newDate: Dayjs | null) => {
    setDate(newDate);
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

  const router = useRouter();
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

    // fetch('api/cadastro', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'Application/json',
    //   },
    //   body: JSON.stringify(body),
    // }).then(async (response) => {
    //   const message = await response.json();
    //   if (response.status == 307) {
    //     router.push(message.message);
    //   } else {
    //     alert(message.message);
    //   }
    // });
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
                  <CardHeader title="Data" sx={{ color: 'primary.main' }} />
                </Paper>
                <Grid sx={{ p: '20px' }}>
                  <Stack direction="row" spacing={'auto'}>
                    <FormControl sx={{ width: '40%' }}>
                      <Typography sx={{ fontSize: '1.2em' }}>Mês</Typography>
                      <Select id="mes" value={mes} onChange={handleChangeMes} size="small">
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
                      <Select id="ano" value={anos} onChange={handleChangeAnos} size="small">
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

                  <Stack sx={{ width: '320px', mt: '20px', mb: '10px' }}>
                    <DatePicker
                      views={['year', 'month']}
                      minDate={minDate}
                      maxDate={maxDate}
                      value={value}
                      onChange={(newDate) => {
                        setValue(newDate);
                      }}
                      renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
                  </Stack>
                </Grid>
              </LocalizationProvider>
            </Card>
          </Paper>

          {/* Segundo Card */}
          <Paper elevation={3} sx={{ mb: '2em' }}>
            <Card>
              <Paper elevation={3}>
                <CardHeader title="Localidade" sx={{ color: 'primary.main' }} />
              </Paper>
              <Stack sx={{ m: '20px' }}>
                <Typography sx={{ fontSize: '1.2em', mb: '3px' }}>Escolha o Município</Typography>
                <Autocomplete
                  id="localidade"
                  popupIcon={<SearchIcon style={{ color: 'primary.main' }} />}
                  disableClearable
                  size="small"
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
                <CardHeader title="Partos" sx={{ color: 'primary.main' }} />
              </Paper>
              <Stack sx={{ m: '20px' }}>
                <FormControl>
                  <Typography sx={{ fontSize: '1.2em', color: '#383838' }}>
                    Partos Normais
                  </Typography>
                  <OutlinedInput
                    id="qtdnormal"
                    required
                    sx={{
                      color: '#383838',
                      textAlign: 'center',
                      mt: '3px',
                    }}
                    size="small"
                    placeholder="Inserir quantidade de Partos Normais"
                  />
                  <Typography sx={{ fontSize: '1.2em', color: '#383838', mt: '20px' }}>
                    Partos Sensíveis
                  </Typography>
                  <OutlinedInput
                    id="qtdsensivel"
                    required
                    sx={{
                      color: '#383838',
                      textAlign: 'center',
                      mt: '3px',
                    }}
                    size="small"
                    placeholder="Inserir quantidade de Partos Sensíveis"
                  />
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
            experimentalFeatures={{ newEditingApi: true }}
            hideFooterSelectedRowCount
            sx={{ width: '100%', background: '#FFFFFF', color: 'primary.main', boxShadow: 3 }}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
