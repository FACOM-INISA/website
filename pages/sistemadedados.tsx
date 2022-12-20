import type { NextPage } from 'next';
import React from 'react';
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
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../styles/components/SistemaDeDados.module.css';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import OpenDataVisualization from '../components/graficoLinha';
import PieChartData from '../components/graficoTorta';
import Layout from '../components/layouts/default';

const theme = createTheme({
  palette: {
    primary: {
      main: '#077FA8',
    },
  },

  typography: {
    fontFamily: 'Lato',
  },
});

const municipios = [
  { name: 'Água Clara', id: 1 },
  { name: 'Alcinópolis', id: 2 },
  { name: 'Amambai', id: 3 },
  { name: 'Anastácio', id: 4 },
  { name: 'Anaurilândia', id: 5 },
  { name: 'Angélica', id: 6 },
  { name: 'Antônio João', id: 7 },
  { name: 'Aparecida do Taboado', id: 8 },
  { name: 'Aquidauana', id: 9 },
  { name: 'Aral Moreira', id: 10 },
  { name: 'Bandeirantes', id: 11 },
  { name: 'Bataguassu', id: 12 },
  { name: 'Batayporã', id: 13 },
  { name: 'Bela Vista', id: 14 },
  { name: 'Bodoquena', id: 15 },
  { name: 'Bonito', id: 16 },
  { name: 'Brasilândia', id: 17 },
  { name: 'Caarapó', id: 18 },
  { name: 'Camapuã', id: 19 },
  { name: 'Campo Grande', id: 20 },
  { name: 'Caracol', id: 21 },
  { name: 'Cassilândia', id: 22 },
  { name: 'Chapadão do Sul', id: 23 },
  { name: 'Corguinho', id: 24 },
  { name: 'Coronel Sapucaia', id: 25 },
  { name: 'Corumbá', id: 26 },
  { name: 'Costa Rica', id: 27 },
  { name: 'Coxim', id: 28 },
  { name: 'Deodápolis', id: 29 },
  { name: 'Dois Irmãos do Buriti', id: 30 },
  { name: 'Douradina', id: 31 },
  { name: 'Dourados', id: 32 },
  { name: 'Eldorado', id: 33 },
  { name: 'Fátima do Sul', id: 34 },
  { name: 'Figueirão', id: 35 },
  { name: 'Glória de Dourados', id: 36 },
  { name: 'Guia Lopes da Laguna', id: 37 },
  { name: 'Iguatemi', id: 38 },
  { name: 'Inocência', id: 39 },
  { name: 'Itaporã', id: 40 },
  { name: 'Itaquiraí', id: 41 },
  { name: 'Ivinhema', id: 42 },
  { name: 'Japorã', id: 43 },
  { name: 'Jaraguari', id: 44 },
  { name: 'Jardim', id: 45 },
  { name: 'Jateí', id: 46 },
  { name: 'Juti', id: 47 },
  { name: 'Ladário', id: 48 },
  { name: 'Laguna Carapã', id: 49 },
  { name: 'Maracaju', id: 50 },
  { name: 'Miranda', id: 51 },
  { name: 'Mundo Novo', id: 52 },
  { name: 'Naviraí', id: 53 },
  { name: 'Nioaque', id: 54 },
  { name: 'Nova Alvorada do Sul', id: 55 },
  { name: 'Nova Andradina', id: 56 },
  { name: 'Novo Horizonte do Sul', id: 57 },
  { name: 'Paranaíba', id: 58 },
  { name: 'Paranhos', id: 59 },
  { name: 'Pedro Gomes', id: 60 },
  { name: 'Ponta Porã', id: 61 },
  { name: 'Porto Murtinho', id: 62 },
  { name: 'Ribas do Rio Pardo', id: 63 },
  { name: 'Rio Brilhante', id: 64 },
  { name: 'Rio Verde de Mato Grosso', id: 65 },
  { name: 'Rochedo', id: 66 },
  { name: 'Santa Rita do Pardo', id: 67 },
  { name: 'São Gabriel do Oeste', id: 68 },
  { name: 'Selvíria', id: 69 },
  { name: 'Sete Quedas', id: 70 },
  { name: 'Sidrolândia', id: 71 },
  { name: 'Sonora', id: 72 },
  { name: 'Tacuru', id: 73 },
  { name: 'Taquarussu', id: 74 },
  { name: 'Terenos', id: 75 },
  { name: 'Três Lagoas', id: 76 },
  { name: 'Vicentina', id: 77 },
];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const dados = [
  { name: 'Partos', id: 0 },
  { name: 'Partos Normais', id: 1 },
  { name: 'Partos Sensíveis', id: 2 },
];

{
  /* ANTES DAQUI */
}
const SistemaDeDados: NextPage = () => {
  const options = municipios.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

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

  const [limpar, setLimpar] = React.useState('');

  return (
    <Layout className={styles.sistema}>
      
      
        <Grid>
        <ThemeProvider theme={theme}>
        
        <div className={styles.main}>
        <div className={styles.sidebar}>
          <Grid className={styles.grid} alignItems="center">
            <Paper elevation={3}>
              <Card style={{ display: 'flex', flexDirection: 'column' }}>
                <CardHeader
                  title={
                    <span style={{ textAlign: 'center', color: '#077FA8' }}>
                      Filtro por Região
                    </span>
                  }
                  action={
                    <IconButton
                      onClick={handleExpandClickR}
                      aria-expanded={expandedR}
                      aria-label="show more"
                      style={{ color: '#077FA8' }}
                    >
                      {expandedR ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  }
                />
              </Card>
              <Collapse in={expandedR} className={styles.collapse}>
                <Autocomplete
                  className={styles.busca}
                  popupIcon={<SearchIcon style={{ color: '#077FA8' }} />}
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
                  <Button variant="contained" onClick={() => setLimpar('')}>
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
                    <span style={{ textAlign: 'center', color: '#077FA8' }}>Filtro de Dados</span>
                  }
                  action={
                    <IconButton
                      onClick={handleExpandClickD}
                      aria-expanded={expandedD}
                      aria-label="show more"
                      style={{ color: '#077FA8' }}
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
                          <ListItemText key={dado.id} style={{ color: '#077FA8' }}>
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
      
      

      
      
    </ThemeProvider>

    <Grid alignItems={'flex-end'} alignContent='flex-end'>
          <Grid item>
            <PieChartData/>
          </Grid>
        
          <Grid item> 
            <OpenDataVisualization />
          </Grid>
         
        </Grid>
        </Grid>
    </Layout>
  );
};

export default SistemaDeDados;
