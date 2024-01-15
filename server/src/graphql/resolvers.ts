const resolvers = {
  Query: {
    getWeather: async (_, { city }, context) => {
      // Implement logic to fetch weather data from OpenWeatherMap or any source
      // You can use context for authentication checks if required
      return {
        city,
        temperature: 23.5,
        description: 'Sunny',
      };
    },
    getRepositories: async (_, __, context) => {
      // Implement logic to fetch user's GitHub repositories
      // You can use context for authentication checks if required
      // Example using a hardcoded access token
      if (!context.authenticated) {
        throw new Error('Authentication required for this query.');
      }

      // Fetch repositories using the GitHub API
      // Replace this with your actual implementation
      const repositories = await fetchGitHubRepositories(context.githubAccessToken);

      return repositories;
    },
  },
};

export default resolvers;
