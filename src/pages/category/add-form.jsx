import React from 'react'
import { Form, Select, Input } from 'antd'

const Item = Form.Item
const { Option } = Select

export default function AddForm (props) {
  const { categorys, parentId, myFormAdd } = props

  return (
    <Form ref={myFormAdd}>
      <Item name="categoryId"
        initialValue={parentId}
        rules={[
          {required: true, message: '分类层级必选'}
        ]}
      >
        <Select>
          <Option value='0'>一级分类</Option>
          {
            categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
          }
        </Select>
      </Item>
      <Item
        name="categoryName"
        rules={[
          {required: true, message: '分类名称必须输入'}
        ]}
      >
        <Input placeholder='请输入分类名称' />
      </Item>
    </Form>
  )
}