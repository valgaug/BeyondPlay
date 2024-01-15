import { fetchGitHubData } from './helper';
import { QueryResolvers } from '../../../generated/graphql';

export const queryResolvers: QueryResolvers = {
  getRepositories: async (_parent, args, context) => {
    if (!context.user) {
      throw new Error('Unauthorized! You need to be logged in.');
    }
    const data = await fetchGitHubData(`/users/${args.userName}`);
    return data;
  },
};

export const gitHubResolvers = {
  Query: queryResolvers,
};
