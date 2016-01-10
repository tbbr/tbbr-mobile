'use strict'

// Dependencies
import React from 'react-native'
import { connect } from 'react-redux/native'
import { fetchFriendships } from '../../modules/friendships/actions'
import styles from './list-styles'

// Components
import FriendshipCard from './card'

let {
  ListView
} = React

class FriendshipsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.friendships)
    })
  }

  componentDidMount() {
    const { dispatch, accessToken } = this.props
    dispatch(fetchFriendships(accessToken))
  }

  renderFriendshipRow(friendship) {
    return (
      <FriendshipCard friendship={friendship}/>
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderFriendshipRow}
        style={styles.friendshipList}
      />
    )
  }
}

function mapStateToProps(state) {
  const { entities, auth } = state

  // TODO: Remove accessToken from here and access it inside actions
  return {
    accessToken: auth.accessToken,
    friendships: entities.friendships
  }
}

export default connect(mapStateToProps)(FriendshipsList)
