import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE = ''

//登录
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

