import React, { Component } from 'react'
import { Container, Tab, Row, Col, Nav } from 'react-bootstrap'
import '../../../scss/studentDash.scss'
import { connect } from 'react-redux'
import {
  getAssignment,
  getAssignments,
  getCourses,
  getLoggedInUser,
} from '../../../actions'

class FacultyDash extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    if (!this.props.auth.isLoggedIn) {
      this.props.history.push('/login')
    }
  }
  render() {
    return (
      <Container>
        <section>
          <h1>Faculty Dashboard</h1>
        </section>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courses: Object.values(state.courses),
    assignments: Object.values(state.assignments),
    auth: state.auth,
    user: state.currentUser,
  }
}

export default connect(mapStateToProps, {
  getAssignment,
  getAssignments,
  getCourses,
  getLoggedInUser,
})(FacultyDash)
