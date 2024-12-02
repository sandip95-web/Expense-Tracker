import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
  mutation SignUp($input: SignUpInput!) {
    signup(input: $input) {
      _id
      username
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput) {
    login(input: $input) {
      username
    }
  }
`;
export const LOGOUT_USER = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
