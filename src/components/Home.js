import React, { Component } from 'react'
import { Button, Container, Image } from 'react-bootstrap'
import '../scss/home.scss'
import logo from '../images/logo.png'
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
          <h1 className='mt-4'>A fun way to do your assignments!</h1>
          <p>
            Our goal is to get rid of the traditional assignments system, and
            replace it with a more enjoyable reward-based system.
            <br />
            If your university is registered with us, you can login with your
            provided credentials and start learning while having fun!
          </p>
          <Button variant='primary' as={Link} to='/login'>
            LOGIN
          </Button>
        </Container>
      </section>
    )
  }
}

export default Home
