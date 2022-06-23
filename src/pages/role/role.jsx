import React, { useState, useEffect, useRef } from 'react'
import { Card, Button, Modal, Table, message } from 'antd'
import AddForm from './add-form'
import AuthForm from './auth-form'
import { formateDate } from '../../utils/dateUtils'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import { connect } from 'react-redux'
import {logout} from '../../redux/actions'

function Role (props) {
  const [roles, setRoles] = useState([])
  const [role, setRole] = useState({})
  const [isShowAdd, setIsShowAdd] = useState(false)
  const [isShowAuth, setIsShowAuth] = useState(false)
  const [columns, setColumns] = useState([
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (create_time) => formateDate(create_time)
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: formateDate
    },
    {
      title: '授权人',
      dataIndex: 'auth_name'
    }
  ])
  const MyAddForm = useRef()
  const auth = useRef()

  useEffect(() => {
    const getRoles = async () => {
      const result = await reqRoles()
      if (result.status === 0) {
        const roles = result.data
        setRoles(roles)
      }
    }
    getRoles()
  }, [])

  const addRole = () => {
    MyAddForm.current.validateFields().then(async (value) => {
      const { RoleName } = value
      MyAddForm.current.resetFields()
      const result = await reqAddRole(RoleName)
      if (result.status === 0) {
        message.success('添加角色成功')
        const role = result.data
        setRoles([...roles, role])
      } else {
        message.error('添加角色失败')
      }
    }).catch(errorInfo => {
      console.log(errorInfo)
    })
  }
  const onRow = (role) => {
    return {
      onClick: event => {
        console.log(role)
        setRole(role)
      }
    }
  }
  const updateRole = async () => {
    setIsShowAuth(false)
    const menus = auth.current.getMenus()
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = props.user.username
    
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      //如果当前更新的是自己角色的权限，则强制退出
      if (role._id === props.user._id) {
        props.logout()
        message.success('当前角色权限')
      } else {
        message.success('设置角色权限成功')
        setRoles([...roles])
      }
    }
  }

  const title = (
    <span>
      <Button type='primary' onClick={() => setIsShowAdd(true)}>创建角色</Button>&nbsp;&nbsp;
      <Button type='primary' disabled={!role._id} onClick={() => setIsShowAuth(true)}>设置角色权限</Button>
    </span>
  )

  return (
    <Card title={title}>
      <Table
        bordered
        rowKey='_id'
        dataSource={roles}
        columns={columns}
        pagination={{defaultPageSize: PAGE_SIZE}}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [role._id],
          onSelect: (role) => {
            setRole(role)
          }
        }}
        onRow={onRow}
      />
      <Modal
        title="添加角色"
        visible={isShowAdd}
        onOk={addRole}
        onCancel={() => {
          setIsShowAdd(false)
          MyAddForm.current.resetFields()
        }}
      >
        <AddForm MyAddForm={MyAddForm} />
      </Modal>
      <Modal
        title="设置角色权限"
        visible={isShowAuth}
        onOk={updateRole}
        onCancel={() => {
          setIsShowAuth(false)
        }}
      >
        <AuthForm ref={auth} role={role} />
      </Modal>
    </Card>
  )
}

export default connect(
  state => ({user: state.user}),
  {logout}
)(Role)