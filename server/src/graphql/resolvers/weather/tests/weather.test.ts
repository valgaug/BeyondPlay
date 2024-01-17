import axios from 'axios';
import { fetchWeatherData } from '../helper';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchWeatherData', () => {
  it('should fetch weather data successfully', async () => {
    const resp = {
      data: {
        name: 'Paris',
        weather: [{ description: 'clear sky' }],
        main: { temp: 298.15 },
      },
    };
    mockedAxios.get.mockResolvedValue(resp);

    const data = await fetchWeatherData('Paris');

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('Paris'));
    expect(data).toEqual({
      city: 'Paris',
      weather: 'clear sky',
      temperature: 25,
    });
  });
});
