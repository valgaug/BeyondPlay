import { fetchGitHubData } from './helper';
import { QueryResolvers } from '../../../generated/graphql';

export const queryResolvers: QueryResolvers = {
  getRepositories: async (_parent, _args, context) => {
    const token = context.user.token;
    // const data = await fetchGitHubData('/users/username', token);
    return [
      {
        name: 'he',
        description: 'g',
        url: 'd',
      },
    ];
  },
};

export const gitHubResolvers = {
  Query: queryResolvers,
};
