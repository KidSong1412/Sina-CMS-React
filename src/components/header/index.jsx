import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import LinkButton from '../link-button'
import { formateDate } from '../../utils/dateUtils'
import { connect } from 'react-redux'
import './index.less'
import {logout} from '../../redux/actions'

function Header (props) {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(formateDate(Date.now()))

  useEffect(() => {
    let intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      setCurrentTime(currentTime)
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [currentTime])

  const logout = () => {
    Modal.confirm({
      content: '确定退出吗?',
      onOk: () => {
        props.logout()
        navigate('/login', {replace: true})
      }
    })
  }

  return (
    <div className="header">
      <div className="header-top">
        <span>欢迎</span>
        <LinkButton onClick={logout}>退出</LinkButton>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{props.headTitle}</div>
        <div className="header-bottom-right">
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({headTitle: state.headTitle, user: state.user}),
  {logout}
)(Header)