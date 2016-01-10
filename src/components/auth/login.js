'use strict'

// Dependencies
import React from 'react-native'
import FBLogin from 'react-native-facebook-login'
import request from 'superagent-bluebird-promise'
import { login } from '../../modules/auth/actions'

let {
  StyleSheet,
  View
} = React

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
      <View style={styles.loginContainer}>
        <FBLogin
          permissions={['email', 'user_friends']}
          onLogin={this.onLogin.bind(this)}
        />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 10,
    paddingRight: 10
  }
})

export default Login
