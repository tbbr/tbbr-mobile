'use strict'

const initialState = {
    transactions: [],
    friendships: [],
    groups: [],
    users: []
}

export default function entities(state = initialState, action) {
  if (action.entities) {
    return Object.assign({}, state, action.entities)
  }
  return state
}
