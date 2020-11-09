import React from "react"
import { navigate } from "gatsby"
import { Row } from "react-bootstrap"
import { useAuthState } from "../context/auth"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Users from "../components/users"
import Messages from "../components/messages"

const IndexPage = () => {
  const { user } = useAuthState()

  if (!user) {
    navigate("/login")
  }
  return (
    <Layout>
      <SEO title="Home" />

      <Row className="shadow-lg bg-white p-3">
        <Users />
        <Messages />
      </Row>
    </Layout>
  )
}

export default IndexPage
