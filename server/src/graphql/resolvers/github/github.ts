import { fetchGitHubData } from './helper';
import { QueryResolvers } from '../../../generated/graphql';
import { accessLog } from '../../../db/accessLog';

const queryResolvers: QueryResolvers = {
  getRepositories: async (_parent, args, context) => {
    if (!context.user) {
      throw new Error('Unauthorized! You need to be logged in.');
    }
    const data = await fetchGitHubData(`/users/${args.userName}`);

    accessLog.push({
      operation: 'getRepositories',
      user: context.user.userId,
      timestamp: new Date().toISOString(),
    });
    console.log(accessLog);
    return data;
  },
};

export const gitHubResolvers = {
  Query: queryResolvers,
};
