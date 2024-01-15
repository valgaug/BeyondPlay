import { gitHubResolver } from './github/github';
import { weatherResolver } from './weather/weather';

export const resolvers = [gitHubResolver, weatherResolver];
