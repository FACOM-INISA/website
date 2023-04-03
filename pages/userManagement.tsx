import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/default';
import { Button, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useUser from '../lib/useUser';
import { Usuario } from '../lib/User';
import { useRouter } from 'next/router';

export default function GerenciadorUsuarios() {
  const router = useRouter();

  const { user } = useUser({
    redirectTo: '/logIn',
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const [rows, setRows] = React.useState(new Array<Usuario>());

  const handleAuthorizationChange = (user: Usuario) => {
    const newRows = rows.map((row) => {
      if (row.id === user.id) {
        user.authorized = !user.authorized;
        return user;
      }
      return row;
    });
    setRows(newRows);

    console.log('User:', user);

    const url = '/api/user/updateUsers';
    const data = {
      data: [{ email: user.email, authorized: user.authorized }],
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        handleClose();
      })
      .catch((error) => console.error(error));
  };

  const columns: GridColDef[] = [
    {
      field: 'nome',
      headerName: 'Nome',
      type: 'string',
      headerAlign: 'center',
      align: 'center',
      width: 250,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      type: 'string',
      headerAlign: 'center',
      align: 'center',
      width: 250,
    },
    {
      field: 'authorized',
      headerName: 'Autorizado',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row?.authorized ? 'secondary' : 'primary'}
          onClick={() => handleAuthorizationChange(params.row as Usuario)}
          sx={{ width: '100%' }}
        >
          {params.row?.authorized ? 'Desautorizar' : 'Autorizar'}
        </Button>
      ),
    },

    {
      field: 'admin',
      headerName: 'Administrador',
      type: 'boolean',
      headerAlign: 'center',
      align: 'center',
      width: 150,
    },
  ];

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    fetch('/api/user/users', { headers: { 'Content-Type': 'Application/json' } })
      .then((message) => {
        if (!message.ok) {
           return router.push("/")
        } else {
          return message.json()
        }
      })
      .then((data) => {
        if(typeof data === 'boolean') {
          return
        }
        const updatedRows = data.data.map((element: Usuario, index: number) => {
          element.id = index;
          return element;
        });
        setRows(updatedRows);
      });
  }, []);

  return (
    user?.isAdmin && (
      <>
        <Layout>
          <Grid container display="flex" flexDirection="row" flexWrap="nowrap" margin="4em auto" padding="1.25rem 18rem" >
           
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                disableColumnMenu
                disableColumnFilter
                hideFooterSelectedRowCount
                sx={{ background: '#FFFFFF', color: 'primary.main', boxShadow: 3, fontSize: '1em' }}
              />
            
          </Grid>
        </Layout>
      </>
    )
  );
}
