export interface AuthUser {
  username: string;
  email: string;
  profilePicture:string;
}
export interface AuthUserResponse {
  authUser: AuthUser;
}

export interface SignUpUser {
  username: string;
  email: string;
  password: string;
  gender: string;
}
export interface signUpUserResponse{
  signup:SignUpUser[]
}
export interface LoginUser{
  email:string;
  password:string;
}
export interface LoginUserResponse{
  login:LoginUser;
}