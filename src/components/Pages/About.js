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
          <h1>About Us</h1>
          <p className='mt-5'>
            Funsigns is a modern apporach to education. We utilize tech to
            enable optimized reward-based learning. At funsigns, we always hated
            doing class assignments because it had no incentive. But we also do
            know that assignments are an important part of learning. So we have
            introduced our own take on it, the <strong>Funsignments</strong>!
          </p>
          <p>
            A funsignment is a reward-based assignment, where you get
            acheivement badges and points based on your work; The less
            plagerised, the more points you gain. You can then use these points
            in our open Marketplace to download research papers and/or
            assignments from your peers or anyone registered on the website. Now
            you may wonder that allowing the viewability of others assignment
            will encourage students to copy. Not to worry, this is why we have
            plagerism checkers in place so that faculties can choose to allow by
            how much a funsignment is allowed to contain plagerised material.
          </p>
          <p>
            We hope to revolutionize the field of education, where students stop
            thinking of assignments as a burden, but a path to sharpen their
            skills. Join us, and be a part of this journey.
          </p>
        </Container>
      </section>
    )
  }
}

export default About
