import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../../context/AuthContext';
import LoginForm from '../LoginForm';

jest.mock('@apollo/client', () => ({
  useMutation: jest.fn(),
}));

jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('LoginForm', () => {
  it('submits the form with the entered username and password', async () => {
    const mockLoginUser = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([mockLoginUser]);

    const mockSetToken = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ setToken: mockSetToken });

    const { getByLabelText, getByRole } = render(<LoginForm />);

    fireEvent.change(getByLabelText('Username'), { target: { value: 'test' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'test' } });
    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({ variables: { username: 'test', password: 'test' } });
    });
  });
});
