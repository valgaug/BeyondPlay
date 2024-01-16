import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_WEATHER } from '../../graphql/queries/weather';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [getCity, setGetCity] = useState('');

  const { loading, error, data } = useQuery(GET_WEATHER, {
    variables: { city: getCity },
    skip: !getCity,
  });

  const handleClick = () => {
    setGetCity(city);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: 1, borderColor: 'divider', p: 3, borderRadius: 2 }}>
      <TextField label='City' variant='outlined' value={city} onChange={(e) => setCity(e.target.value)} />
      <Button variant='contained' onClick={handleClick}>
        Get Weather
      </Button>
      {error && <Typography color='error'>Error: {error.message}</Typography>}
      {data && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, alignItems: 'center' }}>
          <Typography sx={{ fontSize: '1rem', fontFamily: 'Arial' }}>Weather in {data.getWeather.city}</Typography>
          <Typography sx={{ fontSize: '1rem', fontFamily: 'Arial' }}>{data.getWeather.weather}</Typography>
          <Typography sx={{ fontSize: '1rem', fontFamily: 'Arial' }}>{data.getWeather.temperature}°C</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Weather;
