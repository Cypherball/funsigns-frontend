import React, { Component } from 'react'
import { Button, Container, Image } from 'react-bootstrap'
import '../../scss/home.scss'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <section id='home-banner'>
        <Container className='d-flex flex-column justify-content-center align-items-center'>
          <Image responsive src={logo} className='' />
          <h1 className='my-4 text-center'>
            A fun way to do your assignments!
          </h1>
          <p style={{ fontSize: '120%', textAlign: 'center' }}>
            Our goal is to get rid of the traditional assignments system, and
            replace it with a more enjoyable reward-based system. We call them
            Funsignments :)
            <br />
            If your educational institute is one of our approved partners, you
            can register and start some fun learning!
          </p>
          <Button variant='primary' as={Link} to='/register'>
            Register
          </Button>
        </Container>
      </section>
    )
  }
}

export default Home
