import { SHOW_ERROR_MSG } from '../action-types'

//显示错误信息
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})