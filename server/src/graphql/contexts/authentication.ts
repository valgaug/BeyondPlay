import { ExpressContext } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { users } from '../../db/users';

type Decoded = {
  userId: string;
  iat: number;
  exp: number;
};

export default function context({ req }: ExpressContext) {
  const token = req.headers.authorization?.split(' ')[1] || '';
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as Decoded;

      const dbUser = users.find((user) => user.id === decoded.userId);
      if (!dbUser) {
        throw new Error('User not found');
      }

      if (dbUser.blacklistedTokens?.includes(token)) {
        throw new Error('This token has been blacklisted');
      }

      user = { userId: decoded.userId };
    } catch (error) {
      console.error(error);
    }
  }

  return { user };
}
