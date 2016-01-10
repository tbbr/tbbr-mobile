'use strict'

// Dependencies
import React from 'react-native'
import { Provider } from 'react-redux/native'
import configureStore from './configure-store'

// Components
import App from './containers/app'

const store = configureStore()

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    )
  }
}

export default Root
