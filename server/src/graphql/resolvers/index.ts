import { gitHubResolvers } from './github/github';
import { weatherResolvers } from './weather/weather';
import { userResolvers } from './user/user';

export const resolvers = [gitHubResolvers, weatherResolvers, userResolvers];
