import axios from 'axios';
import { GitHubRepo } from './types';

export async function fetchGitHubData(endpoint: string) {
  const url = `https://api.github.com${endpoint}/repos`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: ``,
        Accept: 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    const filteredRepos = response.data.map((repo: GitHubRepo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
    }));

    return filteredRepos;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`GitHub API request failed: ${error.response?.status}`);
    }
    throw error;
  }
}
