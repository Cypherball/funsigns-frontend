import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import ReactDOM from 'react-dom'
import reducers from './reducers'
import App from './components/App'
import './scss/main.scss'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  store = createStore(
    reducers,
    this.composeEnhancers(applyMiddleware(reduxThunk))
  )

  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    )
  }
}

ReactDOM.render(<Index />, document.querySelector('#root'))
