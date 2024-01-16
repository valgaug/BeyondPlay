import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($githubUserName: String!) {
    getRepositories(githubUserName: $githubUserName) {
      name
      description
      url
    }
  }
`;
