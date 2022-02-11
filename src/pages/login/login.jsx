import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate, Navigate } from 'react-router-dom'
import './login.less'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

export default function Login() {
  const navigate = useNavigate()
  
  const onFinish = async (val) => {
    const { username, password } = val
    const result = await reqLogin(username, password)
    if (result.status ===0) {
      message.success('登陆成功')
      const user = result.data
      memoryUtils.user = user
      storageUtils.saveUser(user)
      navigate('/', {replace: true})
    } else {
      message.error(result.msg)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const user = memoryUtils.user
  if (user && user._id) {
    console.log(user)
    console.log(user._id)
    return <Navigate to="/" />
  }

  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登陆</h2>
        <Form
          className="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, whitespace: true, message: '用户名必须输入' },
              { min: 4, message: '用户名至少4位' },
              { max: 12, message: '用户名最多12位' },
              { pattern: /^[a-zA-Z0-9]+$/, message: '用户名必须是英文或数字线组成' }
            ]}
          >
            <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, whitespace: true, message: '用户名必须输入' },
              { min: 4, message: '用户名至少4位' },
              { max: 12, message: '用户名最多12位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
            ]}
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}