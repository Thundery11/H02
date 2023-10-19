export type usersDbType = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
  passwordHash: string;
  passwordSalt: string;
};

export type usersOutputType = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
};
