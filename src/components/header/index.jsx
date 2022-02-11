import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import LinkButton from '../link-button'
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import './index.less'

export default function Header () {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(formateDate(Date.now()))
  const [title, setTitle] = useState('首页')

  useEffect(() => {
    let intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      setCurrentTime(currentTime)
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [currentTime])

  useEffect(() => {
    const pathname = location.pathname
    menuList.forEach(item => {
      if (pathname === '/') {
        setTitle('首页')
      } else if (item.key === pathname) {
        setTitle(item.title)
      } else if (item.children) {
        const cItem = item.children.find(cItem => pathname.indexOf(cItem.key) === 0)
        if (cItem) {
          setTitle(cItem.title)
        }
      }
    })
  }, [title])

  const logout = () => {
    Modal.confirm({
      content: '确定退出吗?',
      onOk: () => {
        storageUtils.removeUser()
        memoryUtils.user = {}
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
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right">
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
  )
}