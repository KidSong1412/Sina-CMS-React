import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import { connect } from 'react-redux'

const { Footer, Sider, Content } = Layout;

function Admin(props) {
  const user = props.user
  if (!user || !user._id) {
    return <Navigate to="/login" />
  }
  return (
    <Layout style={{minHeight: '100%'}}>
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content style={{margin: 20, backgroundColor: '#fff'}}>
          <Outlet />
        </Content>
        <Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
      </Layout>
    </Layout>
  )
}

export default connect(
  state => ({user: state.user}),
  {}
)(Admin)