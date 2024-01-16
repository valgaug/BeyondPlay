import { userResolvers } from '../user';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

jest.mock('../../../../db/users', () => {
  const mockUsers = [
    {
      id: '1',
      username: 'test',
      password: 'test',
      blacklistedTokens: [],
    },
  ];

  return {
    users: mockUsers,
  };
});

process.env.JWT_SECRET = 'secret';

describe('mutationResolvers', () => {
  it('logs in a user', async () => {
    (jwt.sign as jest.Mock).mockReturnValue('token');

    const args = { username: 'test', password: 'test' };

    const loginUser = userResolvers.Mutation.loginUser as Function;
    const result = await loginUser(null, args, null);

    expect(result).toEqual({ token: 'token', user: { id: '1', username: 'test', password: 'test', blacklistedTokens: [] } });
  });

  it('logs out a user', async () => {
    const args = { username: 'test', token: 'token' };
    const logoutUser = userResolvers.Mutation.logoutUser as Function;
    await logoutUser(null, args, null);

    // Access the mockUsers from the mocked module
    const { users: mockUsers } = require('../../../../db/users');
    expect(mockUsers[0].blacklistedTokens).toContain('token');
  });
});
