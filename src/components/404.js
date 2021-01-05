import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Component404 extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <section>
        <Container>
          <h1 className='text-center font-normal'>¯\(°_o)/¯</h1>
          <h1 className='display-3 text-center mb-5'>Page Not Found</h1>
          <p className='text-center'>
            <Link to='/'>Take me back Home</Link>
          </p>
        </Container>
      </section>
    )
  }
}

export default Component404
