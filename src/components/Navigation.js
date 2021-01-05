import React, { Component } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import logo from '../images/logo.png'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false, dropdownShow: false }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      //window.scrollTo(0, 0)
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }

  render() {
    return (
      <Navbar
        collapseOnSelect
        variant='dark'
        expand='lg'
        className='shadow'
        expanded={this.state.expanded}
      >
        <Container>
          <Link
            to='/'
            className='navbar-brand w-25 hvr-grow'
            onClick={() => {
              this.setState({ expanded: false, dropdownShow: false })
            }}
          >
            <img
              id='brand-logo'
              alt='Logo'
              src={logo}
              className='align-top mr-3'
            />
            <span id='brand-name'>Funsigns</span>
          </Link>

          <Navbar.Toggle
            aria-controls='basic-navbar-nav'
            onClick={() => {
              this.setState({ expanded: !this.state.expanded })
            }}
          />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='w-100 justify-content-between'>
              <Link
                to='/'
                className={`nav-link hvr-grow ${
                  this.props.location.pathname === '/' ? 'active' : ''
                }`}
                onClick={() => {
                  this.setState({ expanded: false, dropdownShow: false })
                }}
              >
                Home
              </Link>
              <Link
                to='/about'
                className={`nav-link hvr-grow ${
                  this.props.location.pathname === '/about' ? 'active' : ''
                }`}
                onClick={() => {
                  this.setState({ expanded: false, dropdownShow: false })
                }}
              >
                About
              </Link>

              <Link
                to='/contact-us'
                className={`nav-link hvr-grow ${
                  this.props.location.pathname === '/contact-us' ? 'active' : ''
                }`}
                onClick={() => {
                  this.setState({ expanded: false, dropdownShow: false })
                }}
              >
                Contact Us
              </Link>

              <Link
                to='/login'
                className={`nav-link hvr-grow ${
                  this.props.location.pathname === '/login' ? 'active' : ''
                }`}
                onClick={() => {
                  this.setState({ expanded: false, dropdownShow: false })
                }}
              >
                Login
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default withRouter((props) => <Navigation {...props} />)
