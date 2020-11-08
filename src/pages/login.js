import React, { useState } from "react"
import Layout from "../components/layout"
import { Form, Button } from "react-bootstrap"
import { useLazyQuery } from "@apollo/client"
import { LOGIN_USER } from "../graphql"
import { navigate, Link } from "gatsby"
import SEO from "../components/seo"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})

  const { email, password } = formData

  const [login, { loading }] = useLazyQuery(LOGIN_USER, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    onCompleted(data) {
      localStorage.setItem("token", data.login.token)
      setFormData({
        email: "",
        password: "",
      })
      navigate("/")
    },
  })

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setErrors({})
    login({ variables: { email, password } })
  }

  return (
    <Layout>
      <SEO title="Login" />
      <Form
        className="formwidth shadow-lg p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-muted">Login</h3>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={`${errors.email && "is-invalid"}`}
          />
          {errors.email ? (
            <Form.Text className="text-danger">{errors.email}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={`${errors.password && "is-invalid"}`}
          />
          {errors.password ? (
            <Form.Text className="text-danger">{errors.password}</Form.Text>
          ) : null}
        </Form.Group>

        <div className="text-center">
          <Button variant="info" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </Button>
        </div>
        <p className="lead mt-2 text-center">
          Not a user? <Link to="/register">Register</Link>
        </p>
      </Form>
    </Layout>
  )
}

export default Login
