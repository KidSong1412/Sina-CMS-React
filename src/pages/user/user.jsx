import React, { useState, useEffect, useRef } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import LinkButton from '../../components/link-button/index'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api/index'
import UserForm from './user-form'
import { formateDate } from '../../utils/dateUtils'

export default function User () {
  const [users, setUsers] = useState([]) //所有用户列表
  const [roles, setRoles] = useState([]) //所有角色列表
  const [isShow, setIsShow] = useState(false)
  const [user,setUser] = useState({})
  const [roleNames, setRoleNames] = useState({})
  const userForm = useRef()
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      render: formateDate
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      render: (role_id) => roleNames[role_id]
    },
    {
      title: '操作',
      render: (user) => (
        <span>
          <LinkButton onClick={() => showUpdate(user)}>修改</LinkButton>
          <LinkButton onClick={() => deleteUser(user)}>删除</LinkButton>
        </span>
      )
    }
  ]

  //将角色id转化为角色名
  const initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    setRoleNames(roleNames)
  }

  const getUsers = async () => {
    const result = await reqUsers()
    if (result.status === 0) {
      const {users, roles} = result.data
      initRoleNames(roles)
      setUsers(users)
      setRoles(roles)
    }
  }

  useEffect(() => {
    getUsers()
  },[])

  const showAdd = () => {
    setUser({})
    setIsShow(true)
  }

  const addOrUpdateUser = () => {
    setIsShow(false)
    userForm.current.validateFields().then(async formData => {
      //判断是否是更新
      if (user) {
        formData._id = user._id
      }
      const result = await reqAddOrUpdateUser(formData)
      if(result.status === 0) {
        message.success(`${user ? '修改' : '添加'}用户成功`)
        getUsers()
      }
    }).catch(errorInfo => {
      console.log(errorInfo)
    })
  }

  const showUpdate = (user) => {
    setUser(user)
    setIsShow(true)
  }

  const deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${user.username}吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if(result.status === 0) {
          message.success('删除用户成功!')
          getUsers()
        }
      }
    })
  }

  const title = <Button type='primary' onClick={showAdd}>创建用户</Button>

  return (
    <Card title={title}>
      <Table
        bordered
        rowKey='_id'
        columns={columns}
        dataSource={users}
        pagination={{defaultPageSize: 2}}
      />
      <Modal
        title={users._id ? '修改用户' : '添加用户'}
        visible={isShow}
        onOk={addOrUpdateUser}
        onCancel={() => {
          setIsShow(false)
          userForm.current.resetFields()
        }}
      >
        <UserForm
          userForm={userForm}
          roles={roles}
          user={user}
        />
      </Modal>
    </Card>
  )
}