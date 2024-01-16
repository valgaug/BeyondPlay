import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations/login';
import { useAuth } from '../../context/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser] = useMutation(LOGIN_MUTATION);
  const { setToken } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginUser({ variables: { username, password } });
      const token = response.data.loginUser.token;
      setToken(token);
      localStorage.setItem('authToken', token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate autoComplete='off' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label='Username' variant='outlined' value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label='Password' variant='outlined' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant='contained' type='submit'>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
