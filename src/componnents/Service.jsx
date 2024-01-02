
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GlobalState from '../store/GlobalState';
import FormService from './FormService';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { observer } from 'mobx-react';
import Box from '@mui/material/Box'; 

const Service = observer(() => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [open, setOpen] = React.useState(false);

  const postService = async (data) => {
    await fetch('http://localhost:8787/service', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };

  const addService = async (data) => {
    postService(data);
    GlobalState.addService(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { id, name, description, duration, price };
    addService(data);
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getServices() {
    axios.get(`http://localhost:8787/services`).then((res) => {
      GlobalState.services = res.data;
    });
  }

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      {GlobalState.isAdmin && (
        <Button variant="outlined" onClick={handleClickOpen}>
Add service        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add service</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form>
              <Box marginBottom={2}>
                <TextField
                  id="filled-basic"
                  label="קוד"
                  variant="filled"
                  value={id}
                  onChange={(event) => setId(event.target.value)}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  id="filled-basic"
                  label="שם"
                  variant="filled"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  id="filled-basic"
                  label="תיאור"
                  variant="filled"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  id="filled-basic"
                  label="משך הזמן"
                  variant="filled"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  id="filled-basic"
                  label="מחיר"
                  variant="filled"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </Box>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cansele</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
      {GlobalState.services.map((service, index) => (
        <FormService service={service} key={index} />
      ))}
    </>
  );
});


export default Service;
