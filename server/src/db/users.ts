type User = {
  id: string;
  username: string;
  password: string;
  blacklistedTokens?: string[];
};

export const users: User[] = [
  {
    id: '1',
    username: 'Valentin',
    password: '123456',
  },
  {
    id: '2',
    username: 'Marine',
    password: '123456',
  },
];
