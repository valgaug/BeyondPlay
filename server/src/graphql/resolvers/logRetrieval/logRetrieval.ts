import { QueryResolvers } from '../../../generated/graphql';
import { accessLog } from '../../../db/accessLog';

const queryResolvers: QueryResolvers = {
  getAccessLogs: (_parent, _args, context) => {
    console.log(context.user);
    if (!context.user.isAdmin) {
      throw new Error('Unauthorized access');
    }
    return accessLog;
  },
};

export const logRetrievalResolver = {
  Query: queryResolvers,
};
