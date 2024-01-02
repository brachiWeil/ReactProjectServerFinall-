


import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';
import { Container, Typography, Button, Box, Paper, Grid, ThemeProvider, createTheme } from '@mui/material';
import GlobalState from '../store/GlobalState';

const DetailsView = observer(() => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');

  const handleEdit = () => {
    GlobalState.sentToEdit(true);
  };

  const getBusinessData = () => {
    axios.get('http://localhost:8787/businessData').then((res) => {
      const businessData = res.data;
      GlobalState.business = res.data;
      setId(businessData.id);
      setName(businessData.name);
      setAddress(businessData.address);
      setPhone(businessData.phone);
      setLogo(businessData.logo);
      setDescription(businessData.description);
    });
  };

  useEffect(() => {
    getBusinessData();
  }, []);

  const theme = createTheme({
    palette: {
      background: {
        default: '#f2f2f2', 
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Paper style={{ padding: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={20} md={40}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '200px', // רוחב של העיגול
                    height: '200px', // גובה של העיגול
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '20px', // מרווח מתחת לתמונה
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Typography variant="h2" gutterBottom>
About me                </Typography>
                <div>
                  תז: {id} <br />
                  שם: {name} <br />
                  כתובת: {address} <br />
                  טלפון: {phone} <br />
                  תיאור: {description} <br />
                  {GlobalState.isAdmin && <Button onClick={handleEdit}>editing</Button>}
                </div>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
});

export default DetailsView;