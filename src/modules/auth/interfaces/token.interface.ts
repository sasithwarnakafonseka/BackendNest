import { User } from 'src/entities';

export interface ITokenUser {
  sub: number;
  email?: string;
  role?: string;
}

/**
 * JWT token response
 */
export interface ITokenResponse {
  access_token: string;
  expires_in: string;
  sub?: number;
  user?: User;
}
