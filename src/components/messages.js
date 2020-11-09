import React, { useEffect, useState } from "react"
import { Col, Form } from "react-bootstrap"
import { useLazyQuery, useMutation } from "@apollo/client"
import { GET_MESSAGES, SEND_MESSAGE } from "../graphql"
import { useMessageState, useMessageDispatch } from "../context/message"
import Message from "../components/message"

const Messages = () => {
  const [content, setContent] = useState("")
  const { users } = useMessageState()
  const dispatch = useMessageDispatch()
  const selectedUser = users?.find(user => user.selected === true)
  const messages = selectedUser?.messages

  const [getMessages, { loading: msgLoading, data: msgData }] = useLazyQuery(
    GET_MESSAGES
  )

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: data =>
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: selectedUser.username,
          message: data.sendMessage,
        },
      }),
    onError: err => console.log("mutation error:", err),
  })

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
    selectedChat = messages.map(msg => <Message key={msg._id} msg={msg} />)
  } else if (messages.length === 0) {
    selectedChat = <p>You are now connected. Start chatting</p>
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (content.trim() === "" || !selectedUser) return
    sendMessage({ variables: { to: selectedUser.username, content } })
    setContent("")
  }

  return (
    <Col xs={8}>
      <p className="lead">Messages</p>
      <hr />
      {selectedChat}
      {selectedUser && (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              className="rounded-pill bg-white"
              placeholder="Type message"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      )}
    </Col>
  )
}

export default Messages
