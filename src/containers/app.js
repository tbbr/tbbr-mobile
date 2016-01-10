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
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      accessToken: null,
      currentUserId: null
    }
  }

  renderFriendshipList() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderFriendshipRow}
        style={styles.friendshipList}
      />
    )
  }

  renderFriendshipRow(friendship) {
    let formattedBalance = "$" + (friendship.balance/100).toFixed(2).toString()
    let balanceStyle = styles.balance
    if (friendship.balance > 0) {
      balanceStyle = styles.balancePositive
    } else if (friendship.balance < 0) {
      balanceStyle = styles.balanceNegative
    }
    return (
      <View style={styles.friendship} key={friendship.id}>
        <Image
          source={{uri: friendship.friend.avatarUrl}}
          style={styles.avatar}
        />
        <View style={styles.friendshipRight}>
          <Text style={styles.name}>{friendship.friend.name}</Text>
          <Text style={balanceStyle}>{formattedBalance}</Text>
        </View>
      </View>
    )
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
  },
  friendshipList: {
    backgroundColor: colors.secondaryDark
  },
  friendship: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: colors.secondaryBase,
    borderBottomWidth: 1,
    padding: 10
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 300,
    marginRight: 15
  },
  friendshipRight: {
    flex: 1
  },
  name: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 8,
    color: '#BDBDBD'
  },
  balance: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.secondaryLighter
  },
  balancePositive: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.primaryDark
  },
  balanceNegative: {
    fontSize: 20,
    fontWeight: '300',
    color: '#FF5555'
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
