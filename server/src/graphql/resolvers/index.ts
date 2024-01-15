import { gitHubResolvers } from './github/github';
import { weatherResolvers } from './weather/weather';

export const resolvers = [gitHubResolvers, weatherResolvers];
