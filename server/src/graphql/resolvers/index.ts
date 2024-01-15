import { gitHubResolvers } from './github/github';
import { weatherResolvers } from './weather/weather';
import { userResolvers } from './user/user';
import { logRetrievalResolver } from './logRetrieval/logRetrieval';

export const resolvers = [gitHubResolvers, weatherResolvers, userResolvers, logRetrievalResolver];
