import React, { PureComponent } from 'react'
import { Form, Input, Tree } from 'antd'
import menuList from '../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree

export default class AuthForm extends PureComponent {
  constructor (props) {
    super(props)
    
    const { menus } = props.role
    this.state = {
      checkedKeys: menus
    }
  }

  onCheck = checkedKeys => {
    this.setState({ checkedKeys })
  }

  //为父组件提供最新的menus数据的方法
  getMenus = () => this.state.checkedKeys

  render () {
    const {role} = this.props
    const {checkedKeys} = this.state
    return (
      <div>
        <Item label='角色名称' labelCol={{span: 4}} wrapperCol={{span: 15}}>
          <Input value={role.name} disabled />
        </Item>
        <Tree
          checkable
          defaultExpandAll={true}
          defaultCheckedKeys={checkedKeys}
          treeData={menuList}
          onCheck={this.onCheck}
        />
      </div>
    )
  }
}