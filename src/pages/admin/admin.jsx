import { Navigate } from 'react-router-dom'
import { Layout } from 'antd'
import memoryUtils from '../../utils/memoryUtils'

import LeftNav from '../../components/left-nav'

const { Header, Footer, Sider, Content } = Layout;

export default function Admin() {
  const user = memoryUtils.user
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
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}