import context from '../authentication';
import jwt from 'jsonwebtoken';

import { ExpressContext } from 'apollo-server-express';

jest.mock('jsonwebtoken');
jest.mock('../../../db/users', () => ({
  users: [{ id: '1', username: 'user1', isAdmin: true, blacklistedTokens: [] }],
}));

describe('context', () => {
  it('returns null user for no token', () => {
    const req = { headers: {} };
    const ctx = context({ req } as ExpressContext);
    expect(ctx.user).toBeNull();
  });

  it('returns user for valid token', () => {
    jwt.verify = jest.fn().mockReturnValue({ userId: '1' });
    const req = { headers: { authorization: 'Bearer valid_token' } };
    const ctx = context({ req } as ExpressContext);

    expect(jwt.verify).toHaveBeenCalledWith('valid_token', undefined);
    expect(ctx.user).toEqual({ userId: '1', isAdmin: true });
  });

  it('returns null user for invalid token', () => {
    jwt.verify = jest.fn().mockImplementation(() => {
      throw new Error('Invalid token');
    });
    const req = { headers: { authorization: 'Bearer invalid_token' } };
    const ctx = context({ req } as ExpressContext);

    expect(ctx.user).toBeNull();
  });

  it('returns null user for blacklisted token', () => {
    const mockUsers = require('../../../db/users').users;
    mockUsers[0].blacklistedTokens.push('blacklisted_token');
    jwt.verify = jest.fn().mockReturnValue({ userId: '1' });

    const req = { headers: { authorization: 'Bearer blacklisted_token' } };
    const ctx = context({ req } as ExpressContext);

    expect(ctx.user).toBeNull();
  });

  it('returns null user for non-existent user', () => {
    jwt.verify = jest.fn().mockReturnValue({ userId: 'non_existent' });
    const req = { headers: { authorization: 'Bearer valid_token_for_non_existent_user' } };
    const ctx = context({ req } as ExpressContext);
    expect(ctx.user).toBeNull();
    expect(ctx.user).toBeNull();
  });
});
