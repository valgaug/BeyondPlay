import { gql } from '@apollo/client';

export const GET_LOGS = gql`
  query GetAccessLogs {
    getAccessLogs {
      operation
      user
      timestamp
    }
  }
`;
