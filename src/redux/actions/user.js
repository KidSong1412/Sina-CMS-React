import { RECEIVE_USER, RESET_USER } from '../action-types'
import { reqLogin } from '../../api'
import storageUtils from '../../utils/storageUtils'
import { showErrorMsg } from './error'

//用户同步
export const receiveUser = (user) => ({type: RECEIVE_USER, user})

//退出登录
export const logout = () => {
  storageUtils.removeUser()
  return {
    type: RESET_USER
  }
}

//异步登录
export const login = (username, password) => {
  return async dispatch => {
    const result = await reqLogin(username, password)
    if (result.status === 0) {
      const user = result.data
      storageUtils.saveUser(user)
      dispatch(receiveUser(user))
    } else {
      const msg = result.msg
      dispatch(showErrorMsg(msg))
    }
  }
}