import ajax from './ajax'

const BASE = ''

//登录
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')