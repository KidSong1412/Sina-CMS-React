import storageUtils from '../../utils/storageUtils'
import { RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from '../action-types'

//用户登录
const initUser = storageUtils.getUser()
export function user (state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg
      return {...state, errorMsg}
    case RESET_USER:
      return {}
    default:
      return state
  }
}