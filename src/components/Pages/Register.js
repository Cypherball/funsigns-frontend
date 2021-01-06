import React, { Component } from 'react'
import { Button, Container, Form, Alert } from 'react-bootstrap'
import { Form as FinalForm, Field } from 'react-final-form'
import { Link } from 'react-router-dom'
import validator from 'validator'
import _ from 'lodash'
import axios from 'axios'
import { connect } from 'react-redux'
import { login } from '../../actions'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showServerMessage: false,
      serverMessage: null,
      serverMessageVariant: null,
      disableButton: false,
    }
  }

  // Placeholder submission
  onSubmit = async (formValues) => {
    formValues.type = formValues.type.toLowerCase()
    let response = null
    try {
      this.setState({ disableButton: true })
      response = await axios.post(
        'https://funsigns.herokuapp.com/auth/local/register',
        formValues
      )
      console.log(response.data)
      this.props.login(response.data.jwt)
      this.setState({
        serverMessage: 'User has been created successfully',
        serverMessageVariant: 'success',
        showServerMessage: true,
      })
    } catch (err) {
      console.log(err)
      this.setState({
        serverMessage: 'Failed to create user. Try Again.',
        serverMessageVariant: 'danger',
        showServerMessage: true,
      })
      return
    }

    // Create student or faculty
    let typeResponse = null
    try {
      if (response.data.user.type === 'student') {
        typeResponse = await axios.post(
          'https://funsigns.herokuapp.com/students',
          { userId: response.data.user.id }
        )
        this.props.history.push('/student/dashboard')
      } else if (response.data.user.type === 'faculty') {
        typeResponse = await axios.post(
          'https://funsigns.herokuapp.com/faculties',
          { userId: response.data.user.id }
        )
        this.props.history.push('/faculty/dashboard')
      }
      console.log(typeResponse.data)
    } catch (err) {
      console.log(err)
    }
  }

  validate = (values) => {
    const errors = {}
    if (!values.fullName) {
      errors.fullName = 'Required'
    } else if (values.fullName.trim().length < 5) {
      errors.fullName = 'Must be at least 5 characters'
    }

    if (!values.email) {
      errors.email = 'Required'
    } else if (!validator.isEmail(values.email.trim())) {
      errors.email = 'Invalid Email'
    }

    if (!values.username) {
      errors.username = 'Required'
    } else if (values.username.trim().length < 3) {
      errors.username = 'Must be at least 3 characters'
    }

    if (!values.password) {
      errors.password = 'Required'
    } else if (values.password.trim().length < 6) {
      errors.password = 'Password must be 6 or more characters'
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required'
    } else if (values.confirmPassword.trim() !== values.password.trim()) {
      errors.confirmPassword = 'Passwords do not match'
    }

    if (!values.type || values.type === 'Choose...') {
      errors.type = 'Required'
    } else if (_.indexOf(['Faculty', 'Student'], values.type) === -1) {
      errors.type = 'Invalid Value Selected'
    }
    return errors
  }

  renderServerMessage = () => {
    if (this.state.serverMessage && this.state.showServerMessage) {
      return (
        <Alert
          variant={this.state.serverMessageVariant}
          dismissible
          onClose={() => this.setState({ showServerMessage: false })}
        >
          {this.state.serverMessage}
        </Alert>
      )
    }
  }

  render() {
    return (
      <section>
        <Container className='d-flex flex-column justify-content-center align-items-center my-5'>
          <h1>Register</h1>
          <FinalForm
            onSubmit={this.onSubmit}
            validate={this.validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <Form onSubmit={handleSubmit} id='login-form' className='w-100'>
                {this.renderServerMessage()}
                <Field name='fullName'>
                  {({ input, meta }) => (
                    <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        {...input}
                        type='text'
                        placeholder='Full Name'
                        className='custom-input'
                      />
                      <Form.Text className='small text-danger'>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </Form.Text>
                    </Form.Group>
                  )}
                </Field>
                <Field name='email'>
                  {({ input, meta }) => (
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        {...input}
                        type='email'
                        placeholder='Email'
                        className='custom-input'
                      />
                      <Form.Text className='small text-danger'>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </Form.Text>
                    </Form.Group>
                  )}
                </Field>
                <Field name='username'>
                  {({ input, meta }) => (
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        {...input}
                        type='text'
                        placeholder='Username'
                        className='custom-input'
                      />
                      <Form.Text className='small text-danger'>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </Form.Text>
                    </Form.Group>
                  )}
                </Field>
                <Field name='password'>
                  {({ input, meta }) => (
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        {...input}
                        type='password'
                        placeholder='Password'
                        className='custom-input'
                      />
                      <Form.Text className='small text-danger'>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </Form.Text>
                    </Form.Group>
                  )}
                </Field>
                <Field name='confirmPassword'>
                  {({ input, meta }) => (
                    <Form.Group>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        {...input}
                        type='password'
                        placeholder='Confirm Password'
                        className='custom-input'
                      />
                      <Form.Text className='small text-danger'>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </Form.Text>
                    </Form.Group>
                  )}
                </Field>
                <Field name='type' component='select' defaultValue='Choose...'>
                  {({ input, meta }) => (
                    <Form.Group controlId='formGridState'>
                      <Form.Label>I am a:</Form.Label>
                      <Form.Control
                        as='select'
                        {...input}
                        className='custom-input'
                      >
                        <option disabled>Choose...</option>
                        <option>Faculty</option>
                        <option>Student</option>
                      </Form.Control>
                      <Form.Text className='small text-danger'>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </Form.Text>
                    </Form.Group>
                  )}
                </Field>
                <Button
                  variant='primary'
                  className='mt-5'
                  block
                  type='submit'
                  disabled={submitting}
                >
                  Register
                </Button>
                <p className='mt-4 text-center text-secondary'>
                  Alreay have an account? <Link to='/login'>Click here</Link> to
                  Login.
                </p>
              </Form>
            )}
          />
        </Container>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps, { login })(Register)
