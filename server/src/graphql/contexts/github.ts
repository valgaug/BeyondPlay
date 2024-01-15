import { ExpressContext } from 'apollo-server-express';
import dotenv from 'dotenv';

export default function context({ req }: ExpressContext) {
  const user = {
    isAuthenticated: true,
  };

  return { user };
}
