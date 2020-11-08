import React from "react"
import { Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useAuthState } from "../context/auth"
import { GET_USERS } from "../graphql"
import { useQuery } from "@apollo/client"
import { Row, Col } from "react-bootstrap"

const IndexPage = () => {
  const { user } = useAuthState()
  const { loading, data } = useQuery(GET_USERS)

  if (!user) {
    navigate("/login")
  }
  return (
    <Layout>
      <SEO title="Home" />
      {loading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : null}
      <Row>
        <Col xs={4}>
          {data ? (
            data.getUsers.map(el => <h5 key={el.username}>{el.username}</h5>)
          ) : (
            <p className="lead">No users found</p>
          )}
        </Col>
        <Col xs={8}>
          <p className="lead">Messages</p>
        </Col>
      </Row>
    </Layout>
  )
}

export default IndexPage
