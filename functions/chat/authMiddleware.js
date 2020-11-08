const jwt = require("jsonwebtoken")

module.exports = context => {
  if (context.event.headers.authorization) {
    const token = context.event.headers.authorization.split(" ")[1]
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    context.user = decode
  }
  return context
}
