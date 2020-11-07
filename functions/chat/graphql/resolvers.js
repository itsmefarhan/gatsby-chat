const User = require("../models/User")
const { UserInputError, AuthenticationError } = require("apollo-server-lambda")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = {
  Query: {
    getUsers: async (_, __, context) => {
      let user
      if (context.event.headers.authorization) {
        const token = context.event.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
          if (err) {
            throw new AuthenticationError("Access Denied")
          }
          user = decode
          // console.log("user", user)
        })
      }
      try {
        const users = await User.find({ email: { $ne: user.email } })
        return users
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    login: async (_, args) => {
      const { email, password } = args
      console.log(process.env.JWT_SECRET)
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return new AuthenticationError("Invalid Credentials")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return new AuthenticationError("Invalid Credentials")
        }
        // console.log(user)
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        })
        // user.token = token
        return {
          ...user.toJSON(),
          token,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        }
      } catch (err) {
        console.log(err)
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

        let user = await User.findOne({ email })
        if (user) {
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
