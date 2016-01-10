'use strict'

import merge from 'lodash/object/merge'

const initialState = {
  facebookUserInfo: {},
  currentUserId: null,
  accessToken: null
}

export default function auth(state = initialState, action) {
  if (action.auth) {
    return merge({}, state, action.auth)
  }

  return state
}
