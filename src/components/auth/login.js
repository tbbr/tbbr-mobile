'use strict'

// Dependencies
import React from 'react-native'
import FBLogin from 'react-native-facebook-login'
import request from 'superagent-bluebird-promise'
import { login } from '../../modules/auth/actions'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  onLogin(facebookUserInfo) {
    const { dispatch } = this.props
    dispatch(login(facebookUserInfo))
  }

  render() {
    return (
      <FBLogin
          permissions={['email', 'user_friends']}
          onLogin={this.onLogin.bind(this)}
      />
    )
  }
}

export default Login
