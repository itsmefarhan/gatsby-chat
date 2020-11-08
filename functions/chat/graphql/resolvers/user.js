const User = require("../../models/User")
const { UserInputError, AuthenticationError } = require("apollo-server-lambda")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError("Access Denied")
      }
      // console.log(user)
      try {
        const users = await User.find({ username: { $ne: user.username } })
        return users
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    login: async (_, args) => {
      const { email, password } = args
      let errors = {}
      try {
        if (!email.trim()) errors.email = "Email is required"
        if (!password) errors.password = "Password is required"
        if (Object.keys(errors).length > 0) {
          throw new UserInputError("Bad request", { errors })
        }
        const user = await User.findOne({ email })
        if (!user) {
          errors.email = "Invalid Credentials"
          throw new UserInputError("Bad request", { errors })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          errors.password = "Invalid Credentials"
          throw new UserInputError("Bad request", { errors })
        }

        const token = jwt.sign(
          { username: user.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        )
        // user.token = token
        return {
          ...user.toJSON(),
          token,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        }
      } catch (errors) {
        throw errors
      }
    },
  },
  Mutation: {
    register: async (parent, args, context, info) => {
      const { username, email, password, confirmPassword } = args
      let errors = {}
      try {
        if (!username.trim()) errors.username = "Username is required"
        if (!email.trim()) errors.email = "Email is required"
        if (!password) errors.password = "Password is required"
        if (!confirmPassword)
          errors.confirmPassword = "Confirm Password is required"

        if (password !== confirmPassword)
          errors.confirmPassword = "Password must match"

        let userName = await User.findOne({ email })
        if (userName) {
          errors.username = "User already exists"
        }

        let userEmail = await User.findOne({ email })
        if (userEmail) {
          errors.email = "User already exists"
        }

        if (Object.keys(errors).length > 0) throw errors

        const hashed_password = await bcrypt.hash(password, 10)
        user = new User({
          username,
          email,
          password: hashed_password,
        })
        await user.save()
        // console.log("user,", user)
        return user
      } catch (errors) {
        // console.log(errors)
        throw new UserInputError("Bad request", { errors })
      }
    },
  },
}
