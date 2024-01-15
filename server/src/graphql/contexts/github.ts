import { ExpressContext } from 'apollo-server-express';
import dotenv from 'dotenv';

dotenv.config();

export default function context({ req }: ExpressContext) {
  const token = process.env.GITHUB_TOKEN;

  const user = {
    isAuthenticated: true,
    token,
  };

  return { user };
}
