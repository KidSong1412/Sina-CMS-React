import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'
import { FONTSIZE_18_PX } from '../../common/common'

const { SubMenu } = Menu
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_3162849_v99zl0w6xh.js'
  ],
})

export default function LeftNav(props) {
  const location = useLocation()
  const pathname = location.pathname

  const getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key} style={{fontSize: FONTSIZE_18_PX}}>
            <Link to={item.key}>
              <IconFont type={item.icon} style={{fontSize: FONTSIZE_18_PX}} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        pre.push((
          <SubMenu key={item.key} title={
            <span>
              <IconFont type={item.icon} style={{fontSize: FONTSIZE_18_PX}} />
              <span>{item.title}</span>
            </span>
          } style={{fontSize: FONTSIZE_18_PX}}>
            {getMenuNodes(item.children)}
          </SubMenu>
        ))
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
        <h1>硅谷后台</h1>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
      >
        {menuNodes}
      </Menu>
    </div>
  )
}