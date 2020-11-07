import React from "react"
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import fetch from "cross-fetch"

const client = new ApolloClient({
  link: new HttpLink({
    uri: "/.netlify/functions/chat",
    fetch,
  }),
  cache: new InMemoryCache(),
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
