import fetch from 'node-fetch';

export async function fetchGitHubData(endpoint: string, token: string) {
  const url = `https://api.github.com${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status}`);
  }

  return await response.json();
}
