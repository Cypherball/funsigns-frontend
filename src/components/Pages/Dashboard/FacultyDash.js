import React, { Component } from 'react'
import _ from 'lodash'
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
  getAssignments,
  createAssignment,
  getCourses,
  createCourse,
  getStudents,
  getLoggedInUser,
} from '../../../actions'

class FacultyDash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      alertMessage: null,
      alertVariant: null,
      selectedCourse: null,
    }
    if (!this.props.auth.isLoggedIn) {
      this.props.history.push('/login')
    }
    if (this.props.auth.userType !== 'faculty') {
      this.props.history.push('/')
    }
  }

  componentDidMount() {
    this.props.getLoggedInUser()
    this.props.getCourses()
    this.props.getStudents()
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

                      <Tab.Pane eventKey='assignments'>
                        <Tabs
                          defaultActiveKey='viewAssignments'
                          id='uncontrolled-tab-example'
                        >
                          <Tab eventKey='viewAssignments' title='View'>
                            <h4 className='my-3'>View Assignments</h4>
                            {this.renderAssignmentViewForm()}
                            <div className='mt-3'>
                              {this.state.selectedCourse
                                ? this.renderAssignments()
                                : null}
                            </div>
                          </Tab>
                          <Tab eventKey='createAssignment' title='Create'>
                            <h4 className='my-3'>Create Assignment</h4>
                            {this.renderAssignmentCreateForm()}
                          </Tab>
                          <Tab eventKey='editAssignment' title='Edit' disabled>
                            <h4 className='my-3'>Edit Assignment</h4>
                          </Tab>
                        </Tabs>
                      </Tab.Pane>

                      <Tab.Pane eventKey='students'>
                        <Tabs
                          defaultActiveKey='viewStudents'
                          id='uncontrolled-tab-example'
                        >
                          <Tab eventKey='viewStudents' title='View'>
                            <h4 className='my-3'>View Student</h4>
                            {this.renderStudents(this.props.students)}
                          </Tab>
                          <Tab eventKey='editStudent' title='Edit' disabled>
                            <h4 className='my-3'>Edit Student</h4>
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

  renderCourses = (courses) =>
    courses.map((course) => {
      return (
        <Card className='bg-blue mb-2' key={course.id}>
          <Card.Body>{course.name}</Card.Body>
        </Card>
      )
    })

  renderStudents = (students) =>
    students.map((student) => {
      return (
        <Card className='bg-blue mb-2' key={student.id}>
          <Card.Body>
            <Card.Text>
              <strong>Name: </strong>
              {student.userId.fullName} <strong>Username: </strong>
              {student.userId.username}
              <br />
              <strong>Email: </strong>
              {student.userId.email}
              <br />
              <strong>Number of Assignments Submitted: </strong>
              {student.assignments_completed.length}
            </Card.Text>
          </Card.Body>
        </Card>
      )
    })

  renderAssignments = () =>
    this.state.selectedCourse.assignments.map((assignment) => {
      return (
        <Card className='bg-blue mb-2' key={assignment.id}>
          <Card.Body>
            <Card.Text>
              <strong>{assignment.name}</strong>
              <br />
              {assignment.description ? `${assignment.description}` : null}
              {assignment.description ? <br /> : null}
              <strong>Plagerism Allowed</strong>:{' '}
              {assignment.plagerismAllowed ? `Yes` : `No`} <br />
              {assignment.plagerismAllowed
                ? `Plagerism Amount: ${assignment.value}%`
                : null}
            </Card.Text>
          </Card.Body>
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
            id='create-course-form'
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

  renderCourseSelectOptions = (courses) =>
    courses.map((course) => {
      return (
        <option value={course.id} key={course.id}>
          {course.name}
        </option>
      )
    })

  renderAssignmentViewForm = () => {
    return (
      <FinalForm
        onSubmit={this.onViewAssignmentSubmit}
        validate={(values) => {
          const errors = []
          if (!values.id || values.id === '') {
            errors.id = 'Required'
          }
          return errors
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <Form
            onSubmit={handleSubmit}
            id='create-assignment-form'
            className='w-100'
          >
            <Field name='id' component='select' defaultValue=''>
              {({ input, meta }) => (
                <Form.Group controlId='formGridState'>
                  <Form.Label>Course:</Form.Label>
                  <Form.Control as='select' {...input} className='custom-input'>
                    <option value='' disabled>
                      Choose...
                    </option>
                    {this.renderCourseSelectOptions(this.props.courses)}
                  </Form.Control>
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
              disabled={submitting}
            >
              Select
            </Button>
          </Form>
        )}
      ></FinalForm>
    )
  }

  renderAssignmentCreateForm = () => {
    return (
      <FinalForm
        onSubmit={this.onCreateAssignmentSubmit}
        validate={(values) => {
          const errors = []
          if (!values.course || values.course === '') {
            errors.course = 'Required'
          }
          if (!values.name) {
            errors.name = 'Required'
          } else if (values.name.trim().length < 10) {
            errors.name = 'Must be at least 10 characters'
          }
          if (values.description && values.description.trim().length < 20) {
            errors.description = 'Must be at least 20 characters or blank'
          }
          if (!values.value) {
            errors.value = 'Required'
          } else if (!/^[0]$|^[1-9][0-9]?$|^100$/g.test(values.value)) {
            errors.value = 'Must be between 0 and 100'
          }
          return errors
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <Form
            onSubmit={handleSubmit}
            id='create-assignment-form'
            className='w-100'
          >
            <Field name='course' component='select' defaultValue=''>
              {({ input, meta }) => (
                <Form.Group controlId='formGridState'>
                  <Form.Label>Course:</Form.Label>
                  <Form.Control as='select' {...input} className='custom-input'>
                    <option value='' disabled>
                      Choose...
                    </option>
                    {this.renderCourseSelectOptions(this.props.courses)}
                  </Form.Control>
                  <Form.Text className='small text-danger'>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </Form.Text>
                </Form.Group>
              )}
            </Field>

            <Field name='name'>
              {({ input, meta }) => (
                <Form.Group>
                  <Form.Control
                    {...input}
                    type='text'
                    placeholder='Assignment Title'
                    className='custom-input'
                  />
                  <Form.Text className='small text-danger'>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </Form.Text>
                </Form.Group>
              )}
            </Field>

            <Field name='description' component='textarea'>
              {({ input, meta }) => (
                <Form.Group>
                  <Form.Control
                    {...input}
                    as='textarea'
                    placeholder='Description'
                    className='custom-input'
                  />
                  <Form.Text className='small text-danger'>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </Form.Text>
                </Form.Group>
              )}
            </Field>

            <Field name='value'>
              {({ input, meta }) => (
                <Form.Group>
                  <Form.Control
                    {...input}
                    type='number'
                    placeholder='Plagirism Allowed (in %)'
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
  }

  onViewAssignmentSubmit = async ({ id }) => {
    const course = _.find(this.props.courses, ['_id', id])
    this.setState({ selectedCourse: course })
  }

  onCreateAssignmentSubmit = async (values) => {
    try {
      this.props.createAssignment(values)
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
    students: Object.values(state.students),
    auth: state.auth,
    user: state.currentUser,
  }
}

export default connect(mapStateToProps, {
  getAssignments,
  createAssignment,
  getCourses,
  createCourse,
  getStudents,
  getLoggedInUser,
})(FacultyDash)
