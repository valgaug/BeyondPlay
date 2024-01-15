import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function fetchWeatherData(city: string) {
  const apiKey = process.env.OPENWEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const { name, weather, main } = response.data;
    const temperatureInCelsius = Math.round(main.temp - 273.15);

    return {
      city: name,
      weather: weather[0].description,
      temperature: temperatureInCelsius,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`OpenWeatherMap API request failed: ${error.response?.status}`);
    }
    throw error;
  }
}
