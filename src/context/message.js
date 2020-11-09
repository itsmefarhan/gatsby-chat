import React, { createContext, useReducer, useContext } from "react"

const MessageStateContext = createContext()
const MessageDispatchContext = createContext()

const messageReducer = (state, action) => {
  let mapUser, userIndex
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      }
    case "SET_USER_MESSAGES":
      // const { username, messages } = action.payload
      mapUser = [...state.users]
      userIndex = mapUser.findIndex(
        user => user.username === action.payload.username
      )
      mapUser[userIndex] = {
        ...mapUser[userIndex],
        messages: action.payload.messages,
      }

      return {
        ...state,
        users: mapUser,
      }
    case "SET_SELECTED_USER":
      mapUser = state.users.map(user => ({
        ...user,
        selected: user.username === action.payload,
      }))
      return {
        ...state,
        users: mapUser,
      }
    case "ADD_MESSAGE":
      mapUser = [...state.users]

      userIndex = mapUser.findIndex(
        user => user.username === action.payload.username
      )
      let newUser = {
        ...mapUser[userIndex],
        messages: [...mapUser[userIndex].messages, action.payload.message],
      }
      mapUser[userIndex] = newUser
      return {
        ...state,
        users: mapUser,
      }
    default:
      //   return state
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { users: null })
  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  )
}

export const useMessageState = () => useContext(MessageStateContext)
export const useMessageDispatch = () => useContext(MessageDispatchContext)
