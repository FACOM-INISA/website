import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/images/ufms.png';
import divider from '../public/images/dividerWhite.svg';
import { Box, Grid, Typography } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useRouter } from 'next/router';

export interface HeaderProps {
  items: Array<{
    name: string;
    path: string;
    icon: React.FC;
    active?: boolean;
  }>;
}

const HeaderComponent: React.FC<HeaderProps> = ({ items }: HeaderProps) => {
  const { asPath } = useRouter();

  return (
    <Box
      sx={{
        padding: '0 4em',
        height: 150,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#077FA8',
        color: '#FEFEFE',
      }}
    >
      {/* container esquerdo */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Link href="/">
            <a>
              <Image src={logo} alt="UFMS Logo" width={68} height={90} />
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Image src={divider} height={100} />
        </Grid>
        <Grid item>
          <Typography variant="h4">INISA</Typography>
          <Typography>Instituto Integrado de Saúde</Typography>
        </Grid>
      </Grid>

      {/* container direito */}
      <Grid container alignItems="center" justifyContent="right" spacing={2}>
        {items.map((item, index) => {
          const Icon = item.icon;
          const active = asPath === item.path;

          return (
            <Grid item key={index}>
              <Link href={item.path} passHref>
                <a>
                  <Typography
                    sx={{
                      fontSize: '1.15em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: 1,
                      fontWeight: active ? 'bold' : 'normal',
                      textDecoration: active ? 'underline' : 'none',
                      textUnderlineOffset: 5,
                    }}
                  >
                    {Icon && <Icon />}
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

export default function AppHeader(props: { admin?: boolean }) {
  const elements = [
    { name: 'Inicio', path: '/', icon: HomeIcon },
    { name: 'Painel', path: '/sistemadedados', icon: InsertChartIcon },
    { name: 'Metodologia', path: '/maisinfos', icon: InfoIcon },
  ];

  if (props.admin) elements.push({ name: 'Admin', path: '/admin', icon: AdminPanelSettingsIcon });

  return <HeaderComponent items={elements} />;
}
