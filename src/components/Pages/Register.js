import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Form as FinalForm, Field } from 'react-final-form'
import { Link } from 'react-router-dom'
import validator from 'validator'
import _ from 'lodash'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  // Placeholder submission
  onSubmit = async (values) => {
    await this.sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
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

    if (!values.userType || values.userType === 'Choose...') {
      errors.userType = 'Required'
    } else if (_.indexOf(['Faculty', 'Student'], values.userType) === -1) {
      errors.userType = 'Invalid Value Selected'
    }
    return errors
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
                <Field
                  name='userType'
                  component='select'
                  defaultValue='Choose...'
                >
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

export default Register
