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
  }

  componentDidMount() {
    this.props.getAssignments()
  }

  renderAssignment = () =>
    this.props.assignments.map((assig) => {
      return <p>{assig.id}</p>
    })

  render() {
    return (
      <Container>
        <section>
          <h1>Student Dashboard</h1>
          {this.renderAssignment()}
        </section>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { assignments: Object.values(state.assignments) }
}

export default connect(mapStateToProps, { getAssignments })(StudentDash)
