import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/default';
import {
  Autocomplete,
  Checkbox,
  DialogTitle,
  Stack,
  TextField,
  autocompleteClasses,
} from '@mui/material';
/* import DeleteIcon from '@mui/icons-material/Delete'; */
/* import municipios from '../data/municipios.json'; */
import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useUser from '../lib/useUser';
import { Usuario } from '../lib/User';
import styles from '../styles/components/SistemaDeDados.module.css';
import { useRouter } from 'next/router';

export default function GerenciadorUsuarios() {
  const router = useRouter();

  const { user } = useUser({
    redirectTo: '/logIn',
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};
  const [rows, setRows] = React.useState(new Array<Usuario>());
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  const handleAuthorizationChange = (user: Usuario) => {
    const updatedUser = { ...user, isAuthorized: !user.isAuthorized };

    const newRows = rows.map((row) => (row.id === user.id ? updatedUser : row));

    setSelectedUser(updatedUser);

    setRows(newRows);

    console.log('User:', updatedUser);

    const url = '/api/user/updateUsers';
    const data = {
      data: [{ email: updatedUser.email, authorized: !updatedUser.isAuthorized }],
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
        setIsUserAuthorized(!isUserAuthorized); // Update the local state variable with the new authorization status
      })
      .catch((error) => console.error(error));
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      width: 90,
    },
    {
      field: 'nome',
      headerName: 'Nome',
      type: 'string',
      headerAlign: 'center',
      align: 'center',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      type: 'string',
      headerAlign: 'center',
      align: 'center',
      width: 180,
    },
    {
      field: 'isAuthorized',
      headerName: 'Autorizado',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row?.isAuthorized ? 'primary' : 'secondary'}
          onClick={() => handleAuthorizationChange(params.row as Usuario)}
          sx={{ width: '100%' }}
        >
          {params.row?.isAuthorized ? 'Autorizar' : 'Desautorizar'}
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
      .then((message) => message.json())
      .then((data) => {
        const updatedRows = data.data.map((element: Usuario, index: number) => {
          element.id = index;
          return element;
        });
        setRows(updatedRows);
        setIsUserAuthorized(updatedRows[0].isAuthorized);
      });
  }, []);

  const [isUserAuthorized, setIsUserAuthorized] = useState<boolean>(false);

  const options = rows.map((user) => ({
    value: user.name,
    label: user.email,
    firstLetter: user.name[0].toUpperCase(),
  }));

  return (
    user?.isAdmin && (
      <>
        <Layout>
          <Grid container display="flex" flexDirection="row" flexWrap="nowrap" margin="4em auto">
            
            

            <Grid
              sx={{ width: '60%', mr: '4rem', justifyContent: 'center', justifyItems: 'center' }}
            >
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                hideFooterSelectedRowCount
                sx={{ background: '#FFFFFF', color: 'primary.main', boxShadow: 3, fontSize: '1em' }}
              />
            </Grid>
          </Grid>
        </Layout>
      </>
    )
  );
}
