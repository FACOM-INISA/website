import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Layout from '../components/layouts/default';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

/* import municipios from '../data/municipios.json'; */
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Parto from '../lib/Parto';
import useUser from '../lib/useUser';
import CheckIcon from '@mui/icons-material/Check';
import { Usuario } from '../lib/User';
import { any } from 'bluebird';
import getusers from './api/getusers';
import styles from '../styles/components/SistemaDeDados.module.css';


export default function GerenciadorUsuarios() {
  const { user } = useUser({
    redirectTo: '/logIn',
  });

  /* const options = municipios.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  }); */

  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('info');
  const [alertContent, setAlertContent] = React.useState('');
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = () => setOpenAlert(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};
  const [rows, setRows] = React.useState(new Array<Usuario>());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const handleEdit = (user: Usuario) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };
  
  const handleDelete = useCallback((id: number) => {
    fetch(`/api/deleteuser?id=${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          setAlertSeverity('success');
          setAlertContent('Usuário deletado com sucesso!');
          setOpenAlert(true);''
        } else {
          setAlertSeverity('error');
          setAlertContent('Erro ao deletar usuário!');
          setOpenAlert(true);
        }
      });
  }, [user]);

const columns: GridColDef[] = [
  {
    field: 'actions',
    headerName: 'Ações',
    sortable: false,
    width: 120,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => ( params.value?
      <div>
        <IconButton aria-label="Editar" onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Excluir" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      </div> : null
    ),
  },
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
    type: 'boolean',
    headerAlign: 'center',
    align: 'center',
    width: 150,
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
    fetch('/api/getusers', { headers: { 'Content-Type': 'Application/json' } })
      .then((message) => message.json())
      .then((data) => {
        setRows(
          data.data.filter((element: Usuario, index: number) => {
            element.id = index;

            return element;
          })
        );
        console.log(data);
      });
  }, []);

  



  const handleSave = (user: Usuario) => {
    fetch(`/api/users/${selectedUser?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          setRows(rows.map((u) => (u.id === selectedUser?.id ? user : u)));
          setAlertSeverity('success');
          setAlertContent('Usuário atualizado com sucesso.');
          setOpenAlert(true);
        } else {
          throw new Error('Falha ao atualizar usuário.');
        }
      })
      .catch((error) => {
        setAlertSeverity('error');
        setAlertContent(error.message);
        setOpenAlert(true);
      })
      .finally(() => {
        setEditDialogOpen(false);
      });
  };


  const handleConfirmDelete = () => {
    fetch(`/api/users/${selectedUser?.id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          setRows(rows.filter((user) => user.id !== selectedUser?.id));
          setAlertSeverity('success');
          setAlertContent('Usuário excluído com sucesso.');
          setOpenAlert(true);
        } else {
          throw new Error('Falha ao excluir usuário.');
        }
      })
      .catch((error) => {
        setAlertSeverity('error');
        setAlertContent(error.message);
        setOpenAlert(true);
      })
      .finally(() => {
        setDeleteDialogOpen(false);
      });
  };

  const handleUpdateUser = useCallback(
    (updatedUser: Usuario) => {
      fetch(`/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      })
        .then((res) => {
          if (res.ok) {
            const updatedRows = rows.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            );
            setRows(updatedRows);
            setAlertSeverity('success');
            setAlertContent('Usuário atualizado com sucesso.');
            setOpenAlert(true);
          } else {
            throw new Error('Falha ao atualizar usuário.');
          }
        })
        .catch((error) => {
          setAlertSeverity('error');
          const handleToggleAuthorization = useCallback((id: number, isAuthorized: boolean) => {
            fetch(`/api/updateuser?id=${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ isAuthorized: !isAuthorized }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  setRows((prevRows) =>
                    prevRows.map((row) => {
                      if (row.id === id) {
                        row.isAuthorized = !isAuthorized;
                      }
                      return row;
                    })
                  );
                  setAlertSeverity('success');
                  setAlertContent(`Usuário ${isAuthorized ? 'des' : ''}autorizado com sucesso!`);
                  setOpenAlert(true);
                } else {
                  setAlertSeverity('error');
                  setAlertContent('Erro ao atualizar usuário!');
                  setOpenAlert(true);
                }
              });
          }, []);
        });
    },
    [rows]
  );

  return (
    user?.isLoggedIn && (
      <Layout>
        <Grid container display="flex" flexDirection="row" flexWrap="nowrap" margin="4em auto">
          {/* Sidebar */}
          <Grid className={styles.sidebar}>
            <Grid
              id="form"
              className={styles.grid}
              component="form"
              onSubmit={handleSubmit}
              sx={{ margin: '0 4rem' }}
            >
              <Paper elevation={3} sx={{ mb: '2rem' }}>
                <Card>
                  <Card style={{ display: 'flex', flexDirection: 'column' }}>
                    <CardHeader
                      title={
                        <span
                          style={{ textAlign: 'center', color: '#0088B7', fontWeight: 'bolder' }}
                        >
                          Buscar usuário
                        </span>
                      }
                    />
                  </Card>
                  {/* <Stack sx={{ m: '1.25rem' }}>
                    <Autocomplete
                      id="localidade"
                      popupIcon={<SearchIcon style={{ color: 'primary.main' }} />}
                      disableClearable
                      groupBy={(option) => option.firstLetter}
                      getOptionLabel={(option) => (option.name ? option.name : '')}
                      sx={{
                        width: 'auto',
                        [`& .${autocompleteClasses.popupIndicator}`]: {
                          transform: 'none',
                        },
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      size="small"
                    />
                  </Stack> */}
                </Card>
              </Paper>
            </Grid>
          </Grid>

          {/*  <>
              <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert severity={alertSeverity}>{alertContent}</Alert>
              </Snackbar>
            </>
              */}
          {/* Tabela */}
          <Grid sx={{ width: '60%', mr: '4rem', justifyContent: 'center', justifyItems: 'center' }}>
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
    )
  );
}