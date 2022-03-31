import { combineReducers } from 'redux'
import storageUtils from '../utils/storageUtils'
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-types'

//头部标题
const initHeadTitle = '首页'
function headTitle (state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

//用户登录
const initUser = storageUtils.getUser()
function user (state = initUser, action) {
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

export default combineReducers({
  headTitle,
  user
})