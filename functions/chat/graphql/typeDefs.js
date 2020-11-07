const { gql } = require("apollo-server-lambda")

module.exports = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    token: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    getUsers: [User]!
    login(email: String!, password: String!): User!
  }
  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
  }
`
