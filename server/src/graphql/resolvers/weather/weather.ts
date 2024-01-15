import { QueryResolvers } from '../../../generated/graphql';
import { fetchWeatherData } from './helper';

export const queryResolvers: QueryResolvers = {
  getWeather: async (_parent, args, _context) => {
    const weatherData = await fetchWeatherData(args.city);
    return weatherData;
  },
};

export const weatherResolvers = {
  Query: queryResolvers,
};
