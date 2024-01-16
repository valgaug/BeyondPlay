import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER } from '../../graphql/queries/weather';

const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [getWeather, { loading, error, data }] = useLazyQuery(GET_WEATHER);

  const handleClick = () => {
    getWeather({ variables: { city } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={handleClick}>Get Weather</button>
      {data && (
        <div>
          <h3>Weather in {data.getWeather.city}</h3>
          <p>{data.getWeather.weather}</p>
          <p>{data.getWeather.temperature}°C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
