import type { NextPage } from 'next';
import React from 'react';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Layout from '../components/layouts/default';
import municipios from '../data/municipios.json';
import {
  Button,
  ButtonProps,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MonthPicker } from '@mui/x-date-pickers';
import { YearPicker } from '@mui/x-date-pickers';

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

const InsercaoDeDados: NextPage = () => {
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

  const [ano, setAno] = React.useState('');
  const handleChangeAno = (event: SelectChangeEvent) => {
    setAno(event.target.value);
  };

  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const handleChangeDate = (newDate: Dayjs | null) => {
    setDate(newDate);
  };

  const minDate = dayjs('2015-01-01');
  const maxDate = dayjs();

  return (
    <Layout>
      <Grid container display="flex" flexDirection="row" flexWrap="nowrap" margin="4em auto">
        <Grid sx={{ width: '360px', margin: '0 4rem' }}>
          {/* Primeiro Card */}
          <Paper elevation={3} sx={{ mb: '2em' }}>
            <Card>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Paper elevation={3}>
                  <CardHeader title="Data" sx={{ color: 'primary.main' }} />
                </Paper>
                <Grid sx={{ p: '20px' }}>
                  <Stack direction="row" spacing={'auto'}>
                    <FormControl sx={{ width: '40%' }}>
                      <Typography sx={{ fontSize: '1.2em' }}>Mês</Typography>
                      <Select id="select-helper" value={mes} onChange={handleChangeMes}>
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
                      <Select id="select-helper" value={ano} onChange={handleChangeAno}>
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
                <Typography sx={{ fontSize: '1.2em', mb: '3px' }}>Buscar por Município</Typography>
                <Autocomplete
                  popupIcon={<SearchIcon style={{ color: 'primary.main' }} />}
                  disableClearable
                  options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.name}
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
                  <ButtonAzul variant="contained">Enviar</ButtonAzul>
                </Stack>
              </Stack>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default InsercaoDeDados;
