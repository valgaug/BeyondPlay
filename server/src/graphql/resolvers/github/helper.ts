import { Octokit } from '@octokit/core';

export async function fetchGitHubData(endpoint: string, token: string) {
  const octokit = new Octokit({});
  const response = await octokit.request(`GET ${endpoint}/repos`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (response.status !== 200) {
    throw new Error(`GitHub API request failed: ${response.status}`);
  }

  const filteredRepos = response.data.map((repo: any) => ({
    // 'any' isn't best practice but filteredRepos types is handled by QueryResolvers
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
  }));

  return filteredRepos;
}
