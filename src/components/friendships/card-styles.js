import React from 'react-native'
import styleConstants from '../../styles/constants'

const { colors } = styleConstants

let {
  StyleSheet
} = React

export default StyleSheet.create({
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
