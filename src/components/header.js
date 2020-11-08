import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Navbar, Nav, Container, Button } from "react-bootstrap"
import { useAuthDispatch, useAuthState } from "../context/auth"

const Header = ({ siteTitle }) => {
  const dispatch = useAuthDispatch()
  const { user } = useAuthState()
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/login")
  }

  return (
    <Navbar bg="dark" expand="sm" variant="dark" className="mb-5">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            {siteTitle}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user ? (
              <Button
                variant="link"
                className="text-light"
                style={{ textDecoration: "none" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/register")}
                  variant="link"
                  className="text-light"
                  style={{ textDecoration: "none" }}
                >
                  Register
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  variant="link"
                  className="text-light"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
