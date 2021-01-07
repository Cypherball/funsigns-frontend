import React, { Component } from 'react'
import axios from 'axios'
import {
  Container,
  Tab,
  Row,
  Col,
  Nav,
  Tabs,
  Card,
  Alert,
  Form,
  Button,
} from 'react-bootstrap'
import { Form as FinalForm, Field } from 'react-final-form'
import '../../../scss/studentDash.scss'
import { connect } from 'react-redux'
import {
  getAssignment,
  getAssignments,
  getCourses,
  createCourse,
  getLoggedInUser,
} from '../../../actions'

class FacultyDash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      alertMessage: null,
      alertVariant: null,
    }
    if (!this.props.auth.isLoggedIn) {
      this.props.history.push('/login')
    }
    this.props.getLoggedInUser()
    this.props.getCourses()
  }

  renderCourses = (courses) =>
    courses.map((course) => {
      return (
        <Card className='bg-secondary mb-2'>
          <Card.Body>{course.name}</Card.Body>
        </Card>
      )
    })

  renderCourseCreateForm = () => {
    return (
      <FinalForm
        onSubmit={this.onCreateCourseSubmit}
        validate={(values) => {
          if (!values.name) {
            return { name: 'Required' }
          } else if (values.name.trim().length < 3) {
            return { name: 'Must be at least 3 characters' }
          }
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <Form
            onSubmit={handleSubmit}
            id='render-course-form'
            className='w-100'
          >
            <Field name='name'>
              {({ input, meta }) => (
                <Form.Group>
                  <Form.Control
                    {...input}
                    type='text'
                    placeholder='Course Name'
                    className='custom-input'
                  />
                  <Form.Text className='small text-danger'>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </Form.Text>
                </Form.Group>
              )}
            </Field>
            <Button
              variant='primary'
              className='mt-1'
              type='submit'
              block
              disabled={submitting}
            >
              Submit
            </Button>
          </Form>
        )}
      ></FinalForm>
    )
  }

  render() {
    return (
      <Container>
        <section id='dash'>
          <h1>Faculty Dashboard</h1>
          <div className='dash-greeting'>
            Welcome <b>{this.props.user.fullName}</b>.
          </div>
          <div className='dash-section'>
            <div className='dash-subtitle'>Admin Panel</div>
            <div className='dash-assignments-container'>
              {this.renderAlertMessage()}
              <Tab.Container id='left-tabs-example' defaultActiveKey='courses'>
                <Row>
                  <Col sm={3}>
                    <Nav variant='pills' className='flex-column'>
                      <Nav.Item>
                        <Nav.Link eventKey='courses'>Courses</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey='assignments'>Assignments</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey='students'>Students</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey='courses'>
                        <Tabs
                          defaultActiveKey='viewCourses'
                          id='uncontrolled-tab-example'
                        >
                          <Tab eventKey='viewCourses' title='View'>
                            <h4 className='my-3'>View Courses</h4>
                            {this.renderCourses(this.props.courses)}
                          </Tab>
                          <Tab eventKey='createCourse' title='Create'>
                            <h4 className='my-3'>Create Course</h4>
                            {this.renderCourseCreateForm()}
                          </Tab>
                          <Tab eventKey='editCourse' title='Edit' disabled>
                            <h4 className='my-3'>Edit Course</h4>
                          </Tab>
                        </Tabs>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
        </section>
      </Container>
    )
  }

  onCreateCourseSubmit = async (values) => {
    try {
      this.props.createCourse(values)
      this.setState({
        alertMessage: 'Successful Submission!',
        alertVariant: 'success',
        showAlert: true,
      })
    } catch (err) {
      console.log(err)
      this.setState({
        alertMessage: 'Submission Failed!',
        alertVariant: 'danger',
        showAlert: true,
      })
    }
    // try {
    //   const response = await axios.post(
    //     'https://funsigns.herokuapp.com/auth/local',
    //     { identifier: username, password }
    //   )
    //   console.log(response.data)
    //   this.props.login(response.data.jwt)
    //   this.setState({
    //     serverMessage: 'Login Successful!',
    //     serverMessageVariant: 'success',
    //     showServerMessage: true,
    //   })
    //   if (response.data.user.type === 'student') {
    //     this.props.history.push('/student/dashboard')
    //   } else if (response.data.user.type === 'faculty') {
    //     this.props.history.push('/faculty/dashboard')
    //   } else {
    //     this.props.history.push('/')
    //   }
    // } catch (err) {
    //   console.log(err)
    //   this.setState({
    //     serverMessage: 'Failed to login.',
    //     serverMessageVariant: 'danger',
    //     showServerMessage: true,
    //   })
    // }
  }

  renderAlertMessage = () => {
    if (this.state.alertMessage && this.state.showAlert) {
      return (
        <Alert
          variant={this.state.alertVariant}
          dismissible
          onClose={() => this.setState({ showAlert: false })}
        >
          {this.state.alertMessage}
        </Alert>
      )
    }
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
  createCourse,
  getLoggedInUser,
})(FacultyDash)
