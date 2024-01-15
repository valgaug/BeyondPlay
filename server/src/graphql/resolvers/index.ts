import { gitHubResolvers } from './github/github';
import { weatherResolver } from './weather/weather';

export const resolvers = [gitHubResolvers, weatherResolver];
