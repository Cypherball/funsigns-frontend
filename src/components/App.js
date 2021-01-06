import React, { Component, lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { PongSpinner } from 'react-spinners-kit'

import Navigation from './Navigation'
import Footer from './Footer'
import Component404 from './Pages/404'

const Home = lazy(() => import('./Pages/Home'))
const About = lazy(() => import('./Pages/About'))
const Contact = lazy(() => import('./Pages/Contact'))
const Login = lazy(() => import('./Pages/Login'))
const Register = lazy(() => import('./Pages/Register'))
const StudentDash = lazy(() => import('./Pages/Dashboard/StudentDash'))
const FacultyDash = lazy(() => import('./Pages/Dashboard/FacultyDash'))

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navigation />
            <Suspense
              fallback={
                <section>
                  <Container>
                    <div className='d-flex justify-content-center'>
                      <PongSpinner size={200} color='#44318d' loading />
                    </div>
                    <h1 className='display-3 text-center mt-4'>LOADING</h1>
                  </Container>
                </section>
              }
            >
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/about' exact component={About} />
                <Route path='/contact-us' exact component={Contact} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route
                  path='/student/dashboard'
                  exact
                  component={StudentDash}
                />
                <Route
                  path='/faculty/dashboard'
                  exact
                  component={FacultyDash}
                />
                <Route component={Component404} />
              </Switch>
            </Suspense>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
