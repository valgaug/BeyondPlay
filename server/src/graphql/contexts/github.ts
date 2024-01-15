import { ExpressContext } from 'apollo-server-express';

export default function context({ req }: ExpressContext) {
  const user = {
    isAuthenticated: false,
  };

  return { user };
}
