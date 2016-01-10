'use strict'

import * as types from './constants'
import request from 'superagent-bluebird-promise'
import superagentJsonapify from 'superagent-jsonapify'

import configureStore from '../../configure-store'

superagentJsonapify(request)

const store = configureStore()

export function fetchFriendships(accessToken) {
  const { auth } = store.getState()
  return dispatch => {
    return request.get('http://tbbr.me/api/friendships')
      .set('Authorization', `Bearer ${accessToken}`)
      .then(response => {
        dispatch({
          type: types.REQUEST_FRIENDSHIPS,
          entities: {
            friendships: response.body.data,
            users: response.body.included
          }
        })
      })
      .catch(error => console.log(error))
  }
}
