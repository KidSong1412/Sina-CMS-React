import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'
import { FONTSIZE_18_PX } from '../../common/common'
import { connect } from 'react-redux'
import { setHeadTitle } from '../../redux/actions'

const { SubMenu } = Menu
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_3162849_v99zl0w6xh.js'
  ],
})

function LeftNav(props) {
  const location = useLocation()
  const pathname = location.pathname
  const openKeys = []

  const hasAuth = (item) => {
    const { key, isPublic } = item
    const menus = props.user.role.menus
    const username = props.user.username
    if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
      return true
    } else if (item.children) {
      return !!item.children.find(child => menus.indexOf(child.key) !== -1)
    }
    return false
  }

  const getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (hasAuth(item)) {
        if (!item.children) {
          if (item.key === pathname || pathname.indexOf(item.key) === 0) {
            props.setHeadTitle(item.title)
          }
          pre.push((
            <Menu.Item key={item.key} style={{ fontSize: FONTSIZE_18_PX }}>
              <Link to={item.key} onClick={() => props.setHeadTitle(item.title)}>
                <IconFont type={item.icon} style={{ fontSize: FONTSIZE_18_PX }} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {
          openKeys.push(item.key)
          pre.push((
            <SubMenu key={item.key} title={
              <span>
                <IconFont type={item.icon} style={{ fontSize: FONTSIZE_18_PX }} />
                <span>{item.title}</span>
              </span>
            } style={{ fontSize: FONTSIZE_18_PX }}>
              {getMenuNodes(item.children)}
            </SubMenu>
          ))
        }
      }
      return pre
    }, [])
  }
  const [menuNodes] = useState(getMenuNodes(menuList))
  let selectedKey = location.pathname
  if (selectedKey === '/') {
    selectedKey = '/home'
  }

  return (
    <div className="left-nav">
      <Link to='/' className="left-nav-header">
        <img src={logo} alt="logo" />
        <h1>Sina-CMS</h1>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={openKeys}
      >
        {menuNodes}
      </Menu>
    </div>
  )
}

export default connect(
  state => ({ user: state.user }),
  { setHeadTitle }
)(LeftNav)