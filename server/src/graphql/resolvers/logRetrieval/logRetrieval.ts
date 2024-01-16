import { QueryResolvers } from '../../../generated/graphql';
import { accessLog } from '../../../db/accessLog';

const queryResolvers: QueryResolvers = {
  getAccessLogs: (_parent, _args, context) => {
    if (!context.user || !context.user.isAdmin) {
      throw new Error('Unauthorized! You need to be an Admin.');
    }
    return accessLog;
  },
};

export const logRetrievalResolver = {
  Query: queryResolvers,
};
