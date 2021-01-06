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

import Badge from '../../Badge'
import AssignmentCard from '../../AssignmentCard'

class StudentDash extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getLoggedInUser()
    this.props.getCourses()
  }

  componentDidUpdate() {
    console.log(this.props.courses)
  }

  renderAssignment = () =>
    this.props.assignments.map((assig) => {
      return <p>{assig.id}</p>
    })

  renderCourseNavItem = () =>
    this.props.courses.map((course, index) => {
      return (
        <Nav.Item>
          <Nav.Link eventKey={index}>{course.name}</Nav.Link>
        </Nav.Item>
      )
    })

  renderCoursePane = () =>
    this.props.courses.map((course, index) => {
      return (
        <Tab.Pane eventKey={index}>
          <div className='assignment-card-container'>
            {this.renderAssignmentCard(course.assignments)}
          </div>
        </Tab.Pane>
      )
    })

  renderAssignmentCard = (assignments) =>
    assignments.map((assignment, index) => {
      return (
        <AssignmentCard name={assignment.name} desc={assignment.description} />
      )
    })

  render() {
    return (
      <Container>
        <section id='studentDash'>
          <h1>Student Dashboard</h1>
          <div className='dash-greeting'>
            Welcome <b>{this.props.user.username}</b>.
          </div>
          <div className='dash-section'>
            <div className='dash-subtitle'>Assignments</div>
            <div className='dash-assignments-container'>
              <Tab.Container id='left-tabs-example' defaultActiveKey={0}>
                <Row>
                  <Col sm={3}>
                    <Nav variant='pills' className='flex-column'>
                      {this.renderCourseNavItem()}
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>{this.renderCoursePane()}</Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>

            <div className='dash-subtitle'>Badges</div>
            <div className='dash-badge-container'>
              <Badge
                name='Badge 1'
                description='This is a nice description'
                icon='https://pawankolhe.com/img/pawankolhe.jpg'
              />
              <Badge
                name='Badge 1'
                description='This is a description'
                icon='https://pawankolhe.com/img/pawankolhe.jpg'
              />
              <Badge
                name='Badge 1'
                description='This is a awesome description'
                icon='https://pawankolhe.com/img/pawankolhe.jpg'
              />
            </div>
          </div>
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
    user: state.user,
  }
}

export default connect(mapStateToProps, {
  getAssignment,
  getAssignments,
  getCourses,
  getLoggedInUser,
})(StudentDash)
