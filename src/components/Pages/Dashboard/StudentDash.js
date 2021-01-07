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
import badge1 from '../../../images/badges/1.png'
import badge2 from '../../../images/badges/2.png'
import badge3 from '../../../images/badges/3.png'

import Badge from '../../Badge'
import AssignmentCard from '../../AssignmentCard'

import 'react-step-progress-bar/styles.css'
import { ProgressBar, Step } from 'react-step-progress-bar'

class StudentDash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showBadge1: false,
      showBadge2: false,
      showBadge3: false,
      progress: 0,
    }
    if (!this.props.auth.isLoggedIn) {
      this.props.history.push('/login')
    }
    if (this.props.auth.userType !== 'student') {
      this.props.history.push('/')
    }
    this.props.getLoggedInUser()
    this.props.getCourses()
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
        <AssignmentCard
          name={assignment.name}
          desc={assignment.description}
          plagBadge={this.state.showBadge3}
          progress={this.state.progress}
          updateBadge={this.updateBadge}
          updateProgress={this.updateProgress}
        />
      )
    })

  updateBadge = (name) => {
    console.log('UPDATE BADGE', name)
    switch (name) {
      case 'badge1':
        this.setState({ showBadge1: true })
        break
      case 'badge2':
        this.setState({ showBadge2: true })
        break
      case 'badge3':
        this.setState({ showBadge3: true })
        break
      default:
        break
    }
  }

  updateProgress = () => {
    this.setState({ progress: this.state.progress + 10 })
  }

  render() {
    return (
      <Container>
        <section id='dash'>
          <h1>Student Dashboard</h1>
          <div className='dash-greeting'>
            Welcome <b>{this.props.user.username}</b>.
          </div>

          <div className='dash-section'>
            <div className='dash-subtitle'>Monthly Goal</div>
            <ProgressBar
              percent={this.state.progress}
              filledBackground='linear-gradient(to right, #fefb72, #f0bb31)'
            >
              <Step transition='scale'>
                {({ accomplished, index }) => (
                  <div
                    className={`transitionStep ${
                      accomplished ? 'accomplished' : null
                    }`}
                  >
                    0️⃣
                  </div>
                )}
              </Step>
              <Step transition='scale'>
                {({ accomplished, index }) => (
                  <div
                    className={`transitionStep ${
                      accomplished ? 'accomplished' : null
                    }`}
                  >
                    2️⃣
                  </div>
                )}
              </Step>
              <Step transition='scale'>
                {({ accomplished, index }) => (
                  <div
                    className={`transitionStep ${
                      accomplished ? 'accomplished' : null
                    }`}
                  >
                    4️⃣
                  </div>
                )}
              </Step>
              <Step transition='scale'>
                {({ accomplished, index }) => (
                  <div
                    className={`transitionStep ${
                      accomplished ? 'accomplished' : null
                    }`}
                  >
                    6️⃣
                  </div>
                )}
              </Step>
              <Step transition='scale'>
                {({ accomplished, index }) => (
                  <div
                    className={`transitionStep ${
                      accomplished ? 'accomplished' : null
                    }`}
                  >
                    8️⃣
                  </div>
                )}
              </Step>
              <Step transition='scale'>
                {({ accomplished, index }) => (
                  <div
                    className={`transitionStep ${
                      accomplished ? 'accomplished' : null
                    }`}
                  >
                    🔟
                  </div>
                )}
              </Step>
            </ProgressBar>
            <div className='total-completed-assigns'>
              Total funsignments completed: {this.state.progress / 10}
            </div>
          </div>

          <div className='dash-section'>
            <div className='dash-subtitle'>Funsignments</div>
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
              {this.state.showBadge3 ? (
                <Badge
                  name='No Plagiarism'
                  description='Submitted an assignment with no plagiarism'
                  icon={badge3}
                />
              ) : (
                ''
              )}
              {this.state.progress / 10 >= 6 ? (
                <Badge
                  name="That's a Six"
                  description='Submitted 6 assignments in total'
                  icon={badge2}
                />
              ) : (
                ''
              )}
              {this.state.showBadge1 ? (
                <Badge
                  name='1st Assignment'
                  description='Submitted their first assignment'
                  icon={badge1}
                />
              ) : (
                ''
              )}
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
    user: state.currentUser,
  }
}

export default connect(mapStateToProps, {
  getAssignment,
  getAssignments,
  getCourses,
  getLoggedInUser,
})(StudentDash)
