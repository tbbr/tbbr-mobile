'use strict'

// Dependencies
import React from 'react-native'
import { connect } from 'react-redux/native'
import { fetchFriendships } from '../../modules/friendships/actions'

let {
  Image,
  StyleSheet,
  Text,
  View,
  ListView
} = React

class FriendshipsList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, accessToken } = this.props
    dispatch(fetchFriendships(accessToken))
  }

  render() {
    debugger
    return (
      <Text>Rendered something...</Text>
    )
  }
}

function mapStateToProps(state) {
  const { entities, auth } = state

  debugger
  // TODO: Remove accessToken from here and access it inside actions
  return {
    accessToken: auth.accessToken,
    friendships: entities.friendships
  }
}

export default connect(mapStateToProps)(FriendshipsList)
