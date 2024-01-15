import { ApolloServer } from 'apollo-server';
import resolvers from './graphql/resolvers';
import context from './graphql/context';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';

// Load GraphQL type definitions
const typeDefs = loadSchemaSync(join(__dirname, './graphql/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

async function startServer() {
  // Create an instance of Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  // Start the server and listen on a specific port
  const { url } = await server.listen({ port: 4000 });
  console.log(`Server is running at ${url}`);
}
