import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import GithubData from '../GithubData';
import { GET_REPOSITORIES } from '../../../graphql/queries/github';

const getRepositoriesQueryMock = {
  request: {
    query: GET_REPOSITORIES,
    variables: {
      githubUserName: 'testuser',
    },
  },
  result: {
    data: {
      getRepositories: [
        {
          name: 'test-repo',
          description: 'This is a test repository',
          url: 'https://github.com/testuser/test-repo',
        },
      ],
    },
  },
};

describe('GithubData', () => {
  test('renders label and Get Repositories button', () => {
    const { getByLabelText, getByRole } = render(
      <MockedProvider mocks={[getRepositoriesQueryMock]} addTypename={false}>
        <GithubData />
      </MockedProvider>
    );
    expect(getByLabelText(/GitHub Username/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /Get Repositories/i })).toBeInTheDocument();
  });
});
