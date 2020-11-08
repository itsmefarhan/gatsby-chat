import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Navbar, Nav, Container } from "react-bootstrap"

const Header = ({ siteTitle }) => (
  <Navbar bg="dark" expand="md" variant="dark" className="mb-5">
    <Container>
      <Navbar.Brand><Link to='/' style={{ color: "white", textDecoration:'none' }}>{siteTitle}</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link>
            <Link
              to="/register"
              className="text-light"
              style={{ textDecoration: "none" }}
            >
              Register
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              to="/login"
              className="text-light"
              style={{ textDecoration: "none" }}
            >
              Login
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
