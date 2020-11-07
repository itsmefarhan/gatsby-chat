const { ApolloServer, gql } = require("apollo-server-lambda")
const mongoose = require("mongoose")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")
require("dotenv").config()

mongoose
  .connect("mongodb://localhost:27017/gatsby-chat", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected"))
  .catch(e => console.log(e))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ctx => ctx
})

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
})
