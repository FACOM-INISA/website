import { HTMLAttributes } from 'react';

import { Box } from '@mui/material';

import HeaderComponent from '../header';
import FooterComponent from '../footer';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function DefaultLayout(props: HTMLAttributes<HTMLDivElement>) {
  const { asPath } = useRouter();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>PPSUS - MS</title>
        <meta name="description" content="Generated by Facom-UFMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* header */}
      <HeaderComponent
        admin={asPath.startsWith('/sistemadedados') || asPath.startsWith('/userManagement')}
        userManagement={asPath.startsWith('/admin')}
        logout={asPath === '/admin' || asPath.startsWith('/userManagement')}
      />

      <Box {...props} sx={{ flexGrow: 1 }}>
        {props.children}
      </Box>

      {/* footer */}
      <FooterComponent />
    </Box>
  );
}
