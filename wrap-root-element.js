import React from "react"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import fetch from "cross-fetch"
import { AuthProvider } from "./src/context/auth"
import { MessageProvider } from "./src/context/message"

const httpLink = createHttpLink({
  uri: "/.netlify/functions/chat",
  fetch,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <MessageProvider>{element}</MessageProvider>
    </AuthProvider>
  </ApolloProvider>
)
