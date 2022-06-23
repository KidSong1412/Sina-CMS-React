import { SET_HEAD_TITLE } from '../action-types'

//头部标题
const initHeadTitle = '首页'
export function headTitle (state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}