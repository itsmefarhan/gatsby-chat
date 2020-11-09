import React from "react"
import { Col, Image } from "react-bootstrap"
import { useQuery } from "@apollo/client"
import { GET_USERS } from "../graphql"
import { useMessageDispatch, useMessageState } from "../context/message"

const Users = () => {
  const dispatch = useMessageDispatch()
  const { users } = useMessageState()
  const selectedUser = users?.find(user => user.selected === true)?.username
  const { loading } = useQuery(GET_USERS, {
    onCompleted: data =>
      dispatch({ type: "SET_USERS", payload: data.getUsers }),
    onError: err => console.log(err),
  })

  return (
    <>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}
      <Col xs={4} className="bg-light">
        <p className="lead">Users</p>
        <hr />
        {users ? (
          users.map(el => {
            const selected = selectedUser === el.username
            return (
              <div
                role="button"
                className={`d-flex p-3 hover-effect ${
                  selected && "select-effect"
                }`}
                key={el.username}
                onClick={() =>
                  dispatch({ type: "SET_SELECTED_USER", payload: el.username })
                }
              >
                <Image
                  src="https://images.unsplash.com/photo-1460904577954-8fadb262612c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  roundedCircle
                  className="mr-2"
                  style={{ width: 50, height: 50, objectFit: "cover" }}
                />
                <div>
                  <p className="text-primary m-0">{el.username}</p>
                  <p className="font-weight-light m-0">
                    {el.latestMessage
                      ? el.latestMessage.content
                      : "You are now connected"}
                  </p>
                </div>
              </div>
            )
          })
        ) : (
          <p className="lead">No users found</p>
        )}
      </Col>
    </>
  )
}

export default Users
