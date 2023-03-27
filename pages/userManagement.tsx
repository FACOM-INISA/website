import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/default';
import { Checkbox, DialogTitle } from '@mui/material';
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

  /* const options = municipios.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  }); */

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};
  const [rows, setRows] = React.useState(new Array<Usuario>());
  /* const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); */
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  const handleAuthorizationChange = (user: Usuario) => {
    const updatedUser = { ...user, isAuthorized: !user.isAuthorized };

    const newRows = rows.map((row) => (row.id === user.id ? updatedUser : row));

    setSelectedUser(updatedUser); // Save the updated user for the confirmation dialog

    setOpen(true); // Open the confirmation dialog
    setRows(newRows);
  };
  /* const handleDelete = useCallback((id: number) => {
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
  }, [user]); */

  const columns: GridColDef[] = [
    /*{
      field: 'actions',
      headerName: 'Ações',
      sortable: false,
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div>
          <IconButton aria-label="Editar" onClick={() => handleEdit(params.row)}>
            <EditIcon />
            <h6>Editar</h6>
          </IconButton>
          { <IconButton aria-label="Excluir" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton> }
        </div>
      ),
    },*/
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
        <Checkbox
          checked={params.row?.isAuthorized}
          onChange={() => handleAuthorizationChange(params.row as Usuario)}
          color="primary"
        />
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
    fetch('/api/user/users', { headers: { 'Content-Type': 'Application/json' } })
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

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/');
    }
  }, [user]);

  /* const handleConfirmDelete = () => {
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
 */
  return (
    user?.isAdmin && (
      <>
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {selectedUser?.isAuthorized ? 'Desautorizar usuário' : 'Autorizar usuário'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja {selectedUser?.isAuthorized ? 'desautorizar' : 'autorizar'} o
              usuário {selectedUser?.name}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const { id, isAuthorized } = selectedUser as Usuario;
                const url = '/api/user/updateUsers';
                const data = {
                  data: [{ email: selectedUser?.email, authorized: !isAuthorized }],
                };
                fetch(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                })
                  .then(() => handleClose())

                  .catch((error) => console.error(error));
              }}
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  );
}
