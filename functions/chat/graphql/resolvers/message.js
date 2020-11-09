const User = require("../../models/User")
const Message = require("../../models/Message")
const { UserInputError, AuthenticationError } = require("apollo-server-lambda")

module.exports = {
  Query: {
    getMessages: async (_, { from }, { user }) => {
      if (!user) {
        throw new AuthenticationError("Access Denied")
      }

      try {
        const recipient = await User.findOne({ username: from })
        if (!recipient) {
          throw new UserInputError("User not found")
        }
        // console.log(recipient.username, user.username, from)
        const names = [user.username, recipient.username]

        const messages = await Message.find({
          from: { $in: names },
          to: { $in: names },
        })
        return messages
      } catch (err) {
        console.log(err)
        throw err
      }
    },
  },
  Mutation: {
    sendMessage: async (parent, { to, content }, { user }) => {
      if (!user) {
        throw new AuthenticationError("Access Denied")
      }
      try {
        const recipient = await User.findOne({ username: to })
        if (!recipient) {
          throw new UserInputError("User not found")
        } else if (recipient.username === user.username) {
          throw new UserInputError("Go in front of mirror and talk to yourself")
        }
        if (!content.trim()) {
          throw new UserInputError("Message cannot be empty")
        }
        const message = new Message({
          from: user.username,
          to,
          content,
        })
        await message.save()
        return message
      } catch (err) {
        console.log(err)
        throw err
      }
    },
  },
}
