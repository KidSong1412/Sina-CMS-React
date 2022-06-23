import { combineReducers } from "redux";
import { headTitle } from './home'
import { user } from './user'

export default combineReducers({
  headTitle,
  user
})