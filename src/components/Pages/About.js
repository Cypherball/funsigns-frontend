import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <section>
        <Container>
          <h1>About</h1>
        </Container>
      </section>
    )
  }
}

export default About
