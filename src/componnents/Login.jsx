import { useState } from 'react';
import GlobalState from '../store/GlobalState';
import { observer } from 'mobx-react';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const Login = observer(() => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorAlert, setErrorAlert] = useState(null);

  
  const NameChange = (e) => {
    setName(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };


  const saveIsLogin = async (name, password) => {
    const res = await fetch('http://localhost:8787/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      GlobalState.isLogin = true;
    } else {
      setName('');
      setPassword('');
      setErrorAlert('name or password is not correct!');
      GlobalState.isLogin = false;
    }
  };

  const handleCloseAlert = () => {
    setErrorAlert(null);
  };

  const handeleLogin = () => {
    saveIsLogin(name, password);
  };

  return (
    <>
      <TextField id="outlined-basic" label="Name" variant="outlined" onChange={NameChange} value={name} />
      <br />
      <br />
      <TextField type="password" label="Password" value={password} onChange={passwordChange} />
      <br />
      <br />
      <button onClick={handeleLogin}>login</button>

      {errorAlert && (
        <Alert severity="error" onClose={handleCloseAlert}>
          {errorAlert}
        </Alert>
      )}
    </>
  );
});

export default Login;



