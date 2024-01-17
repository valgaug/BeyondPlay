import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Header from '../Header';
import { useAuth } from '../../../context/AuthContext';

jest.mock('../../../context/AuthContext', () => ({
  useAuth: () => ({ logout: jest.fn() }),
}));

describe('Header', () => {
  test('renders title', () => {
    const { getByText } = render(<Header />);
    expect(getByText('BeyondPlay Technical Test')).toBeInTheDocument();
  });

  test('renders logout button', () => {
    const { getByRole } = render(<Header />);
    expect(getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });
});
