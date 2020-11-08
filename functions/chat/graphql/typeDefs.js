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
  type Message {
    _id: ID!
    content: String!
    from: String!
    to: String!
    createdAt: String!
  }
  type Query {
    getUsers: [User]!
    login(email: String!, password: String!): User!
    getMessages(from: String!): [Message]!
  }
  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
    sendMessage(to: String!, content: String!): Message
  }
`
