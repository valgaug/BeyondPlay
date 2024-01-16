import { gitHubResolvers } from '../github';
import { fetchGitHubData } from '../helper';

jest.mock('../helper', () => ({
  fetchGitHubData: jest.fn(),
}));

describe('getRepositories', () => {
  let context: { user: any };

  beforeEach(() => {
    context = { user: { userId: 'testUser' } };
  });

  it('throws an error if user is not logged in', async () => {
    context.user = null;

    if (typeof gitHubResolvers.Query.getRepositories === 'function') {
      await expect(gitHubResolvers.Query.getRepositories({}, { githubUserName: 'test' }, context, {} as any)).rejects.toThrow(
        'Unauthorized! You need to be logged in.'
      );
    } else {
      throw new Error('getRepositories is not a function');
    }
  });

  it('fetches GitHub data and logs the operation', async () => {
    const mockData = { data: 'testData' };

    (fetchGitHubData as jest.Mock).mockResolvedValue(mockData);

    if (typeof gitHubResolvers.Query.getRepositories === 'function') {
      const result = await gitHubResolvers.Query.getRepositories({}, { githubUserName: 'test' }, context, {} as any);

      expect(fetchGitHubData).toHaveBeenCalledWith('/users/test');
      expect(result).toEqual(mockData);
    } else {
      throw new Error('getRepositories is not a function');
    }
  });
});
