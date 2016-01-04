'use strict'
import React from 'react-native'
import FBLogin from 'react-native-facebook-login'
import request from 'superagent-bluebird-promise'
import superagentJsonapify from 'superagent-jsonapify'

import constants from '../styles/constants'

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
      dataLoaded: false,
      accessToken: null,
      currentUserId: null
    }
  }

  onLogin(e) {
    request.post('http://tbbr.me/api/tokens/oauth/grant')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      grant_type: "facebook_access_token",
      access_token: e.token
    })
    .then(response => {
      this.setState({
        currentUserId: response.body.userId,
        accessToken: response.body.accessToken
      })
      return request.get('http://tbbr.me/api/friendships')
              .set('Authorization', `Bearer ${this.state.accessToken}`)
    })
    .then(response => {
      console.log(this.state.dataSource.cloneWithRows(response.body.data))
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.body.data),
        dataLoaded: true
      })
    })
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
    let rendered
    if (this.state.dataLoaded) {
      rendered = this.renderFriendshipList()
    } else {
      rendered = (
        <FBLogin
            permissions={['email', 'user_friends']}
            onLogin={this.onLogin.bind(this)}
            onLogout={function(e){console.log(e)}}
            onCancel={function(e){console.log(e)}}
            onPermissionsMissing={function(e){console.log(e)}}
        />
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

export default App
