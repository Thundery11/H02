export interface AuthBodyParams {
  login: string;
  email: string;
  password: string;
}

export type emailType = {
  email: string;
};

export type LoginAttempsType = {
  ip_address: string;
  loginDate: string;
};
