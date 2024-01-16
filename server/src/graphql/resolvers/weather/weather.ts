import { QueryResolvers } from '../../../generated/graphql';
import { fetchWeatherData } from './helper';

const queryResolvers: QueryResolvers = {
  getWeather: async (_parent, args, _context) => {
    console.log('hi');
    const weatherData = await fetchWeatherData(args.city);
    return weatherData;
  },
};

export const weatherResolvers = {
  Query: queryResolvers,
};
