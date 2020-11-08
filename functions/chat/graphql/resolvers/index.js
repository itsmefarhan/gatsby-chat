const userResolvers = require("./user")
const messageResolvers = require("./message")

module.exports = {
  Message: {
    // Convert Messages timestamps into iso string
    createdAt: parent => parent.createdAt.toISOString(),
  },
  Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation,
  },
}
