import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import LoginForm from '../LoginForm';
import { LOGIN_MUTATION } from '../../../graphql/mutations/login';

jest.mock('../../../context/AuthContext', () => ({
  useAuth: () => ({
    setToken: jest.fn(),
  }),
}));

const loginMutationMock = {
  request: {
    query: LOGIN_MUTATION,
    variables: {
      username: 'testuser',
      password: 'password123',
    },
  },
  result: {
    data: {
      loginUser: {
        token: 'mock-token',
        user: {
          id: '1',
          username: 'testuser',
          blacklistedTokens: [],
        },
      },
    },
  },
};

describe('LoginForm', () => {
  test('renders labels and button', async () => {
    const { getByLabelText, getByRole } = render(
      <MockedProvider mocks={[loginMutationMock]} addTypename={false}>
        <LoginForm />
      </MockedProvider>
    );
    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
