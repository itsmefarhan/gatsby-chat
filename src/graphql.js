import { gql } from "@apollo/client"

export const REGISTER_USER = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      email
    }
  }
`

export const LOGIN_USER = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      username
      token
    }
  }
`