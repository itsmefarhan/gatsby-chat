import React, { useEffect } from "react"
import { Col } from "react-bootstrap"
import { useLazyQuery } from "@apollo/client"
import { GET_MESSAGES } from "../graphql"
import { useMessageState, useMessageDispatch } from "../context/message"

const Messages = () => {
  const { users } = useMessageState()
  const dispatch = useMessageDispatch()
  const selectedUser = users?.find(user => user.selected === true)
  const messages = selectedUser?.messages

  const [getMessages, { loading: msgLoading, data: msgData }] = useLazyQuery(
    GET_MESSAGES
  )

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } })
    }
  }, [selectedUser])

  useEffect(() => {
    if (msgData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          username: selectedUser.username,
          messages: msgData.getMessages,
        },
      })
    }
  }, [msgData])

  let selectedChat
  if (!messages && !msgLoading) {
    selectedChat = <p>Select a friend</p>
  } else if (msgLoading) {
    selectedChat = <p>Loading</p>
  } else if (messages.length > 0) {
    selectedChat = messages.map(msg => <p key={msg._id}>{msg.content}</p>)
  } else if (messages.length === 0) {
    selectedChat = <p>You are now connected. Start chatting</p>
  }

  return (
    <Col xs={8}>
      <p className="lead">Messages</p>
      <hr />
      {selectedChat}
    </Col>
  )
}

export default Messages
