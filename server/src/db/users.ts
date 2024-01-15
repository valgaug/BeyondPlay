type User = {
  id: string;
  username: string;
  password: string;
  blacklistedTokens?: string[];
  isAdmin: boolean;
};

export const users: User[] = [
  {
    id: '1',
    username: 'Valentin',
    password: '123456',
    isAdmin: true,
  },
  {
    id: '2',
    username: 'Marine',
    password: '123456',
    isAdmin: false,
  },
  { id: '3', username: 'Antoine', password: '654321', isAdmin: false },
];
