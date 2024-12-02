export interface AuthUser {
  username: string;
  email: string;
}
export interface AuthUserResponse {
  data: {
    authUser: AuthUser;
  };
}
