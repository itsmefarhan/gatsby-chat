import React from "react"
import { useAuthState } from "../context/auth"

const Message = ({ msg }) => {
  const { user } = useAuthState()
  const sent = msg.from === user.username
//   const received = !sent
  return (
    <div
      className={`d-flex my-3 align-items-center ${
        sent ? "ml-auto" : "mr-auto"
      }`}
    >
      <div
        className={`px-3 pt-3 rounded-pill ${
          sent ? "bg-primary" : "bg-secondary"
        }`}
      >
        <p className="text-white">{msg.content}</p>
      </div>
    </div>
  )
}

export default Message
