import { MutationResolvers } from '../../../generated/graphql';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { users } from '../../../db/users';

dotenv.config();

const mutationResolvers: MutationResolvers = {
  loginUser: async (_parent, args, _context) => {
    const { username, password } = args;
    const user = users.find((user) => user.username === username && user.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: '1h' });
    return { token, user };
  },
};

export const userResolvers = {
  Mutation: mutationResolvers,
};
