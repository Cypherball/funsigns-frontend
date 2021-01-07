import React, { Component } from 'react'
import { Button, Container, Form, Alert } from 'react-bootstrap'
import { Form as FinalForm, Field } from 'react-final-form'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { connect } from 'react-redux'
import { login } from '../../actions'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showServerMessage: false,
      serverMessage: null,
      serverMessageVariant: null,
      disableButton: false,
    }
  }

  onSubmit = async ({ username, password }) => {
    this.setState({ disableButton: true })
    try {
      const response = await axios.post(
        'https://funsigns.herokuapp.com/auth/local',
        { identifier: username, password }
      )
      console.log(response.data)
      this.props.login(response.data.jwt)
      this.setState({
        serverMessage: 'Login Successful!',
        serverMessageVariant: 'success',
        showServerMessage: true,
      })
      if (response.data.user.type === 'student') {
        this.props.history.push('/student/dashboard')
      } else if (response.data.user.type === 'faculty') {
        this.props.history.push('/faculty/dashboard')
      } else {
        this.props.history.push('/')
      }
    } catch (err) {
      console.log(err)
      this.setState({
        serverMessage: 'Failed to login.',
        serverMessageVariant: 'danger',
        showServerMessage: true,
      })
    }
  }

  validate = (values) => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Required'
    } else if (validator.isEmpty(values.username.trim())) {
      errors.username = 'Required'
    }
    if (!values.password) {
      errors.password = 'Required'
    } else if (validator.isEmpty(values.password.trim())) {
      errors.password = 'Required'
    }
    return errors
  }

  render() {
    return (
      <section>
        <Container className='d-flex flex-column justify-content-center align-items-center my-5'>
          <h1>Login</h1>
          <FinalForm
            onSubmit={this.onSubmit}
            validate={this.validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <Form onSubmit={handleSubmit} id='login-form' className='w-100'>
                {this.renderServerMessage()}
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
                <Button
                  variant='primary'
                  className='mt-5'
                  type='submit'
                  block
                  disabled={submitting}
                >
                  Login
                </Button>
                <p className='mt-4 text-center text-secondary'>
                  Don't have an account? <Link to='/register'>Click here</Link>{' '}
                  to Register.
                </p>
                <p className='text-center text-secondary'>
                  <Link to='#'>Forgot Password?</Link>
                </p>
              </Form>
            )}
          />
        </Container>
      </section>
    )
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
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps, { login })(Login)
