import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/images/ufms.png';
import { Box, Divider, Grid, SvgIconProps, Typography } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';

import painel from '../pages/sistemadedados';
import municipios from '../data/municipios.json';

export interface HeaderProps {
  items: Array<{
    name: string;
    path: string;
    icon: React.FC<SvgIconProps>;
    active?: boolean;
  }>;
}

const HeaderComponent: React.FC<HeaderProps> = ({ items }: HeaderProps) => {
  const { asPath } = useRouter();

  // const router = useRouter();
  // useEffect(() => {
  //   if ((painel() ? municipios) == ())
  //     router.push('/?'), {nome_municipio}, { shallow: true }
  // }, [])

  return (
    <Box
      sx={(theme) => ({
        [theme.breakpoints.up('lg')]: { padding: '0 4em' },
        [theme.breakpoints.up('xl')]: { padding: '0 8em' },
        [theme.breakpoints.down('lg')]: { padding: '0 2em' },
        height: 125,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      })}
    >
      {/* Logo e Inisa */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Link href="/" passHref>
            <a>
              <Image src={logo} alt="UFMS Logo" width={68} height={90} />
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Divider
            sx={{ height: 90, width: 3, backgroundColor: 'primary.contrastText' }}
            orientation="vertical"
            flexItem
          />
        </Grid>
        <Grid item>
          <Typography variant="h4">INISA</Typography>
          <Typography>Instituto Integrado de Saúde</Typography>
        </Grid>
      </Grid>

      {/* Opções de rota */}
      <Grid container alignItems="center" justifyContent="end" spacing={3}>
        {items.map((item, index) => {
          const Icon = item.icon;
          const active = asPath === item.path;

          return (
            <Grid item key={index}>
              <Link href={item.path} passHref>
                <a>
                  <Typography
                    sx={{
                      fontSize: '1.25em',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'start',
                      columnGap: 0.5,
                      fontWeight: active ? 'bold' : 'normal',
                      textDecoration: active ? 'underline' : 'none',
                      textUnderlineOffset: 5,
                    }}
                  >
                    {Icon && <Icon sx={{ fontSize: '1.95rem' }} />}
                    {item.name}
                  </Typography>
                </a>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default function AppHeader(props: { admin?: boolean; logout?: boolean }) {
  const elements = [
    { name: 'Inicio', path: '/', icon: HomeIcon },
    { name: 'Painel', path: '/sistemadedados', icon: InsertChartIcon },
    { name: 'Metodologia', path: '/maisinfos', icon: InfoIcon },
  ];

  if (props.admin) elements.push({ name: 'Admin', path: '/admin', icon: AdminPanelSettingsIcon });
  if(props.admin) elements.push({name: 'Gerenciar Usuários', path: '/userManagement', icon: ManageAccountsIcon});
  if(props.logout) elements.push({name: 'Gerenciar Usuários', path: '/userManagement', icon: ManageAccountsIcon});
  if (props.logout) elements.push({ name: 'Sair', path: '/api/logout', icon: LogoutIcon });

  return <HeaderComponent items={elements} />;
}
