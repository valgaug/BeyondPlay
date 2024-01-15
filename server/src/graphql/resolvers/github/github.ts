import { fetchGitHubData } from './helper';
import { QueryResolvers } from '../../../generated/graphql';

export const queryResolvers: QueryResolvers = {
  getRepositories: async (_parent, _args, context) => {
    const data = await fetchGitHubData('/users/valgaug', ''); // UPDATE: hardcoded userName
    return data;
  },
};

export const gitHubResolvers = {
  Query: queryResolvers,
};
