import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <section>
        <Container>
          <h1>Home</h1>
        </Container>
      </section>
    )
  }
}

export default Home
