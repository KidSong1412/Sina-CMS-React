import React from 'react'
import { Form, Select, Input } from 'antd'

const Item = Form.Item
const Option = Select.Option

export default function UserForm (props) {
  const {roles, user, userForm} = props

  return (
    <Form ref={userForm} labelCol={{span: 4}} wrapperCol={{span: 10}}>
      <Item
        label='用户名'
        name="username"
        initialValue={user.username}
        rules={[{ required: true, message: '未输入用户名' }]}
      >
        <Input placeholder='请输入用户名' />
      </Item>
      {
        user._id ? null : (
          <Item
            label='密码'
            name="password"
            rules={[{ required: true, message: '未输入密码' }]}
          >
            <Input type='password' placeholder='请输入密码' />
          </Item>
        )
      }
      <Item
        label='手机号'
        name="phone"
        initialValue={user.phone}
      >
        <Input placeholder='请输入手机号' />
      </Item>
      <Item
        label='邮箱'
        name="email"
        initialValue={user.email}
      >
        <Input placeholder='请输入邮箱' />
      </Item>
      <Item
        label='角色'
        name="role_id"
        initialValue={user.role_id}
        rules={[{ required: true, message: '未给用户添加角色' }]}
      >
        <Select>
          {
            roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
          }
        </Select>
      </Item>
    </Form>
  )
}