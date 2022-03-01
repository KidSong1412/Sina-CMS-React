import React from 'react'
import { Form, Input } from 'antd'

const Item = Form.Item

export default function AddForm (props) {
  const { MyAddForm } = props
  
  return (
    <Form ref={MyAddForm}>
      <Item
        label='角色名称'
        name="RoleName"
        labelCol={{span: 4}}
        wrapperCol={{span: 15}}
        initialValue=''
        rules={[
          {required: true, message: '角色名称必须输入'}
        ]}
      >
        <Input placeholder='请输入角色名称' />
      </Item>
    </Form>
  )
}