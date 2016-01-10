'use strict'

// Dependencies
import React from 'react-native'
import styles from './card-styles'
import styleConstants from '../../styles/constants'

const { colors } = styleConstants

let {
  Image,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableHighlight
} = React

class FriendshipCard extends React.Component {
  constructor(props) {
    super(props)
  }

  onPress(friendshipId) {
    console.log(friendshipId)
  }

  render() {
    let { friendship } = this.props
    let formattedBalance = "$" + (friendship.balance/100).toFixed(2).toString()
    let balanceStyle = styles.balance

    if (friendship.balance > 0) {
      balanceStyle = styles.balancePositive
    } else if (friendship.balance < 0) {
      balanceStyle = styles.balanceNegative
    }

    return (
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.secondaryLight, false)} onPress={this.onPress.bind(this, friendship.id)}>
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
      </TouchableNativeFeedback>
    )
  }
}

export default FriendshipCard
