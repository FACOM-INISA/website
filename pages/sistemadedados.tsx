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
import OpenDataVisualization from '../components/graficoLinha';
import PieChartData from '../components/graficoTorta';
import Layout from '../components/layouts/default';

import municipios from '../data/municipios.json';

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
              <OpenDataVisualization />
            </Grid>
          </Paper>

          <Grid item sx={{ borderRadius: 2 }}>
            <Paper
              sx={{
                p: 4,
                margin: 'auto',
                width: 800,
                maxWidth: 1200,
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
              }}
            >
              <Grid container>
                <Grid item xs minWidth={700}>
                  <PieChartData />
                </Grid>
                <Grid item xs sm container>
                  <Grid item xs container direction="column" spacing={10}>
                    <Grid item xs>
                      {/* <Paper
                        sx={{ backgroundColor: '#0088B7', p: 2, margin: 'auto', maxWidth: 100 }}
                      >
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          color="#ffffff"
                          fontWeight={800}
                        >
                          Partos
                        </Typography>
                      </Paper>

                      <Typography variant="h5" color="#0088B7" fontWeight={800}>
                        Partos normais
                      </Typography>
                      <Typography variant="h5" color="#0088B7" fontWeight={800}>
                        Partos sensíveis
                      </Typography> */}
                    </Grid>
                  </Grid>
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
