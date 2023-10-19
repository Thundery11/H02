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

export interface UsersBodyParams {
  login: string;
  email: string;
  password: string;
}

export interface UsersQueryParams {
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
  searchLoginTerm: string;
  searchEmailTerm: string;
}
