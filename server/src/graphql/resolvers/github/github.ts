import { fetchGitHubData } from './helper';
import { QueryResolvers } from '../../../generated/graphql';
import { accessLog } from '../../../db/accessLog';

const queryResolvers: QueryResolvers = {
  getRepositories: async (_parent, args, context) => {
    console.log(context.user);
    if (!context.user) {
      throw new Error('Unauthorized! You need to be logged in.');
    }
    const data = await fetchGitHubData(`/users/${args.githubUserName}`);

    accessLog.push({
      operation: 'getRepositories',
      user: context.user.userId,
      timestamp: new Date().toISOString(),
    });
    return data;
  },
};

export const gitHubResolvers = {
  Query: queryResolvers,
};
