/**
 * JWT token response
 */
export interface ITokenResponse {
  sub?: string;
  user?: any;
  access_token: string;
  expires_in: string;
  userId?: string;
  refresh_token?: string;
  refresh_expires_in?: string;
}

export interface ITokenUser {
  sub?: string;
  id?: string;
  role?: string;
  broker_details?: string;
  email?: string;
  failed_login_attempt?: string;
  package?: number;
}
