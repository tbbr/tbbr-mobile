'use strict'

// Dependencies
import React from 'react-native'
import FBLogin from 'react-native-facebook-login'
import request from 'superagent-bluebird-promise'
import { login } from '../../modules/auth/actions'

class FriendshipsList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    debugger
    const { dispatch, currentUserId } = this.props
    dispatch(fetchFriendships(currentUserId))
  }

  render() {
    debugger
  }
}

function mapStateToProps(state) {
  const { auth, entities } = state

  return {
    currentUserId: auth.currentUserId,
    friendships: entities.friendships
  }
}

export default connect(mapStateToProps)(FriendshipsList)
