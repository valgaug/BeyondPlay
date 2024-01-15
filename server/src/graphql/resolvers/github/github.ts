import { fetchGitHubData } from './helper';
import { QueryResolvers } from '../../../generated/graphql';

export const queryResolvers: QueryResolvers = {
  getRepositories: async (_parent, args, context) => {
    const data = await fetchGitHubData(`/users/${args.userName}`);
    return data;
  },
};

export const gitHubResolvers = {
  Query: queryResolvers,
};
