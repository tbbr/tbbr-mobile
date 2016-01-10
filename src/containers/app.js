'use strict'

// Dependencies
import React from 'react-native'
import FBLogin from 'react-native-facebook-login'
import request from 'superagent-bluebird-promise'
import superagentJsonapify from 'superagent-jsonapify'
import { connect } from 'react-redux/native'

import constants from '../styles/constants'

// Components
import Login from '../components/auth/login'
import FriendshipsList from '../components/friendships/list'

const { colors } = constants

superagentJsonapify(request)

let {
  Image,
  StyleSheet,
  Text,
  View,
  ListView
} = React

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { isLoggedIn } = this.props
    let rendered

    if (isLoggedIn) {
      rendered = (
        <FriendshipsList />
      )
    } else {
       rendered = (
        <Login dispatch={this.props.dispatch} />
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Text style={styles.logoText}>tbbr</Text>
        </View>
        {rendered}
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryDark,
  },
  logoView: {
    paddingTop: 20,
    paddingBottom: 20
  },
  logoText: {
    fontFamily: 'monospace',
    fontSize: 20,
    textAlign: 'center',
    color: colors.primaryBase
  }
})

function mapStateToProps(state) {
  const { auth } = state

  return {
    auth,
    isLoggedIn: auth.currentUserId !== null
  }
}

export default connect(mapStateToProps)(App)
