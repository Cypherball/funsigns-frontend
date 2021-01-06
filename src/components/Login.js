import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Form as FinalForm, Field } from 'react-final-form'
import { Link } from 'react-router-dom'
import validator from 'validator'

class Login extends Component {
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
        <Container className='d-flex flex-column justify-content-center align-items-center'>
          <h1>Login</h1>
          <FinalForm
            onSubmit={this.onSubmit}
            validate={this.validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <Form onSubmit={handleSubmit} id='login-form' className='w-100'>
                <Field name='username'>
                  {({ input, meta }) => (
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        {...input}
                        type='text'
                        placeholder='Username'
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
              </Form>
            )}
          />
        </Container>
      </section>
    )
  }
}

export default Login
