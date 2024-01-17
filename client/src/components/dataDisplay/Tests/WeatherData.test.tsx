import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import WeatherData from '../WeatherData';
import { GET_WEATHER } from '../../../graphql/queries/weather';

const getWeatherQueryMock = {
  request: {
    query: GET_WEATHER,
    variables: {
      city: 'testcity',
    },
  },
  result: {
    data: {
      getWeather: {
        city: 'testcity',
        weather: 'Sunny',
        temperature: '20',
      },
    },
  },
};

describe('WeatherData', () => {
  test('renders label and Get Weather button', () => {
    const { getByLabelText, getByRole } = render(
      <MockedProvider mocks={[getWeatherQueryMock]} addTypename={false}>
        <WeatherData />
      </MockedProvider>
    );
    expect(getByLabelText(/City/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /Get Weather/i })).toBeInTheDocument();
  });
});
