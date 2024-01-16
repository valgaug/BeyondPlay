import { logRetrievalResolver } from '../logRetrieval';

jest.mock('../../../../db/accessLog', () => {
  const mockAccessLog = [{ id: '1', entry: 'Access log entry 1' }];

  return {
    accessLog: mockAccessLog,
  };
});

describe('queryResolvers', () => {
  it('returns access logs for admin users', () => {
    const mockAdminContext = { user: { isAdmin: true } };
    const getAccessLogs = logRetrievalResolver.Query.getAccessLogs as Function;
    const result = getAccessLogs(null, null, mockAdminContext);

    const { accessLog } = require('../../../../db/accessLog');
    expect(result).toEqual(accessLog);
  });

  it('throws an error for non-admin users', () => {
    const mockNonAdminContext = { user: { isAdmin: false } };
    const getAccessLogs = logRetrievalResolver.Query.getAccessLogs as Function;

    expect(() => {
      getAccessLogs(null, null, mockNonAdminContext);
    }).toThrow('Unauthorized! You need to be an Admin.');
  });

  it('throws an error for unauthenticated access', () => {
    const getAccessLogs = logRetrievalResolver.Query.getAccessLogs as Function;

    expect(() => {
      getAccessLogs(null, null, {});
    }).toThrow('Unauthorized! You need to be an Admin.');
  });
});
