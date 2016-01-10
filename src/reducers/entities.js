'use strict'

import merge from 'lodash/object/merge'

const initialState = {
    transactions: {},
    friendships: {},
    groups: {},
    users: {}
}

export default function entities(state = initialState, action) {
    if (action.entities) {
        return merge({}, state, action.entities)
    }

    return state
}
