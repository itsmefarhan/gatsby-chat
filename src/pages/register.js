import React, { useState } from "react"
import Layout from "../components/layout"
import { Form, Button } from "react-bootstrap"
import { useMutation } from "@apollo/client"
import { REGISTER_USER } from "../graphql"
import { navigate, Link } from "gatsby"
import SEO from "../components/seo"
import { useAuthState } from "../context/auth"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})

  const { username, email, password, confirmPassword } = formData

  const { user } = useAuthState()

  const [register, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      navigate("/login")
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors)
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
  })

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setErrors({})
    register({ variables: { username, email, password, confirmPassword } })
  }

  if (user) {
    navigate("/")
  }

  return (
    <Layout>
      <SEO title="Register" />
      <Form
        className="formwidth shadow-lg p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-muted">Register</h3>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className={`${errors.username && "is-invalid"}`}
          />
          {errors.username ? (
            <Form.Text className="text-danger">{errors.username}</Form.Text>
          ) : null}
        </Form.Group>
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
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className={`${errors.confirmPassword && "is-invalid"}`}
          />
          {errors.confirmPassword ? (
            <Form.Text className="text-danger">
              {errors.confirmPassword}
            </Form.Text>
          ) : null}
        </Form.Group>
        <div className="text-center">
          <Button variant="info" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>
        <p className="lead mt-2 text-center">
          Already a user? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Layout>
  )
}

export default Register
