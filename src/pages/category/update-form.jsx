import React from 'react'
import { Form, Input } from 'antd'

const Item = Form.Item

export default function UpdateForm (props) {
  const { categoryName, myFormUpd } = props

  return (
    <Form ref={myFormUpd}>
      <Item
        name="categoryName"
        initialValue={categoryName}
        rules={[
          {required: true, message: '分类名称必须输入'}
        ]}
      >
        <Input placeholder='请输入分类名称' />
      </Item>
    </Form>
  )
}