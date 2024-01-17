import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import LogRetrievals from '../LogRetrievals';
import { GET_LOGS } from '../../../graphql/queries/logs';

const getLogsQueryMock = {
  request: {
    query: GET_LOGS,
  },
  result: {
    data: {
      getAccessLogs: [
        {
          operation: 'test-operation',
          user: 'test-user',
          timestamp: '2022-01-01T00:00:00Z',
        },
      ],
    },
  },
};

describe('LogRetrievals', () => {
  test('renders logs', () => {
    const { getByRole } = render(
      <MockedProvider mocks={[getLogsQueryMock]} addTypename={false}>
        <LogRetrievals />
      </MockedProvider>
    );

    expect(getByRole('button', { name: /Get Access Logs/i })).toBeInTheDocument();
  });
});
