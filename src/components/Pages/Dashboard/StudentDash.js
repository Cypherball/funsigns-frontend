import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import {
  createAssignment,
  getAssignment,
  getAssignments,
} from '../../../actions'

class StudentDash extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.props.getAssignments()
  }

  componentDidUpdate() {
    console.log(this.props.assignments)
  }

  render() {
    return (
      <Container>
        <section>
          <h1>Student Dashboard</h1>
        </section>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { assignments: Object.values(state.assignments) }
}

export default connect(mapStateToProps, { getAssignments })(StudentDash)
