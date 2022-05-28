import { AuthStatus } from './auth.enums';

export interface AuthData {
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  status: AuthStatus;
  error: string | null | undefined;
}
