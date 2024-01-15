import { fetchGitHubData } from './helper';
import { QueryResolvers } from '../../../generated/graphql';

export const queryResolvers: QueryResolvers = {
  getRepositories: async (_parent, _args, context) => {
    const token = context.user.token;
    const data = await fetchGitHubData('/users/valgaug', token); // UPDATE: hardcoded user and token
    return data;
  },
};

export const gitHubResolvers = {
  Query: queryResolvers,
};
