import * as types from './constants'
import request from 'superagent-bluebird-promise'

export function login(facebookUserInfo) {
  return dispatch => {
    request.post('http://tbbr.me/api/tokens/oauth/grant')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      grant_type: "facebook_access_token",
      access_token: facebookUserInfo.token
    })
    .then(response => {
      dispatch({
        type: types.LOGIN,
        auth: {
          facebookUserInfo: facebookUserInfo,
          currentUserId: response.body.userId,
          accessToken: response.body.accessToken
        }
      })
    })
  }
}
