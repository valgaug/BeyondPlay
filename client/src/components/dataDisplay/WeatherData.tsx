import React, { useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER } from '../../graphql/queries/weather';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Weather: React.FC = () => {
  const cityRef = useRef('');

  const [getWeather, { loading, data, error }] = useLazyQuery(GET_WEATHER, {
    fetchPolicy: 'network-only',
  });

  const handleClick = () => {
    if (cityRef.current) {
      getWeather({ variables: { city: cityRef.current } });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: 1, borderColor: 'divider', p: 3, borderRadius: 2 }}>
      <TextField label='City' variant='outlined' onChange={(e) => (cityRef.current = e.target.value)} />
      <Button variant='contained' onClick={handleClick}>
        Get Weather
      </Button>
      {error && <Typography color='error'>Error: {error.message}</Typography>}
      {loading && <Typography>Loading...</Typography>}
      {!error && data && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, alignItems: 'center' }}>
          <Typography sx={{ fontSize: '1rem', fontFamily: 'Arial' }}>Weather in {cityRef.current}:</Typography>
          <Typography sx={{ fontSize: '1rem', fontFamily: 'Arial' }}>{data.getWeather.weather}</Typography>
          <Typography sx={{ fontSize: '1rem', fontFamily: 'Arial' }}>{data.getWeather.temperature}°C</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Weather;
