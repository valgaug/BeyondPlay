import Header from './components/common/Header';
import LoginForm from './components/auth/LoginForm';
import Weather from './components/dataDisplay/WeatherData';
import RepositoriesComponent from './components/dataDisplay/GithubData';
import LogRetrievals from './components/dataDisplay/LogRetrievals';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          p: 2,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <Header />
        {!token && <LoginForm />}
        <Weather />
        <RepositoriesComponent />
        <LogRetrievals />
      </Box>
    </Container>
  );
}

export default App;
