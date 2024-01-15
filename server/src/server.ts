import { ApolloServer } from 'apollo-server';
import { resolvers } from './graphql/resolvers';
import context from './graphql/contexts/authentication';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

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

  const PORT = process.env.SERVER_PORT || 4000;

  const { url } = await server.listen({ port: PORT });
  console.log(`Server is running at ${url}`);
}

startServer();
