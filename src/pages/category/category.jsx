import React, { useEffect, useState, useRef } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { ArrowRightOutlined, PlusCircleOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'

export default function Category () {
  const [loading, setLoading] = useState(false)
  const [categorys, setCategorys] = useState([])
  const [subCategorys, setSubCategorys] = useState([])
  const [parentId, setParentId] = useState('0')
  const [parentName, setParentName] = useState('')
  const [showStatus, setShowStatus] = useState(0) //标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
  const [category, setCategory] = useState({}) //数据表单行信息

  const myFormAdd = useRef()
  const myFormUpd = useRef()

  //初始化数据
  const [columns, setColumns] = useState([
    {
      title: "分类名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      width: 300,
      dataIndex: "action",
      render: (text, record) => (
        <span>
          <LinkButton onClick={() => showUpdate(record)}>修改分类</LinkButton>
          {parentId === '0' ? <LinkButton onClick={() => showSubCategorys(record)}>查看子分类</LinkButton> : null}
        </span>
      )
    }
  ])

  const getCategorys = async (pid) => {
    setLoading(true)
    pid = pid || parentId
    const result = await reqCategorys(pid)
    console.log(result)
    setLoading(false)
    if (result.status === 0) {
      const categorys = result.data
      if (pid === '0') {
        setCategorys(categorys)
      } else {
        setSubCategorys(categorys)
      }
    } else {
      message.error('获取分类列表失败')
    }
  }

  useEffect(() => {
    getCategorys()
  }, [])

  const showUpdate = (record) => {
    setCategory(record)
    setShowStatus(2)
  }

  const showSubCategorys = (record) => {
    setParentId(record._id)
    setParentName(record.name)
    getCategorys(record._id)
  }

  const showCategorys = () => {
    setParentId('0')
    setParentName('')
    setSubCategorys([])
  }

  const title = parentId === '0' ? '一级分类列表' : (
    <span>
      <LinkButton onClick={showCategorys}>一级分类列表</LinkButton>
      <ArrowRightOutlined style={{marginRight: 5}} />
      <span>{parentName}</span>
    </span>
  )

  const showAdd = () => {
    setShowStatus(1)
  }

  const addCategory = () => {
    myFormAdd.current.validateFields().then(async (values) => {
      setShowStatus(0)
      const { categoryId, categoryName } = values
      myFormAdd.current.resetFields()
      const result = await reqAddCategory(categoryName, categoryId)
      console.log(result)
      if (result.status === 0) {
        console.log(categoryId)
        console.log(parentId)
        console.log(result.data.parentId)
        if (categoryId === parentId) {
          getCategorys()
        } else if (categoryId === '0') {
          getCategorys('0')
        }
      }
    }).catch(errorInfo => {
      console.log(errorInfo)
    })
  }
  const updateCategory = () => {
    myFormUpd.current.validateFields().then(async (values) => {
      const categoryId = category._id
      const { categoryName } = values
      myFormUpd.current.resetFields()
      const result = await reqUpdateCategory({categoryId, categoryName})
      if (result.status === 0) {
        getCategorys()
      }
    }).catch(errorInfo => {
      console.log(errorInfo)
    })
  }
  const handleCancelAdd = () => {
    myFormAdd.current.resetFields()
    setShowStatus(0)
  }
  const handleCancelUpd = () => {
    myFormUpd.current.resetFields()
    setShowStatus(0)
  }

  const extra = (
    <Button type='primary' onClick={showAdd}>
      <PlusCircleOutlined />
      添加
    </Button>
  )

  return (
    <Card title={title} extra={extra}>
      <Table
        bordered
        rowKey='_id'
        loading={loading}
        dataSource={parentId === '0' ? categorys : subCategorys}
        columns={columns}
        pagination={{defaultPageSize: 5, showQuickJumper: true}} />

        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={addCategory}
          onCancel={handleCancelAdd}
        >
          <AddForm
            categorys={categorys}
            parentId={parentId}
            myFormAdd={myFormAdd}
          />
        </Modal>
        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={updateCategory}
          onCancel={handleCancelUpd}
        >
          <UpdateForm
            categoryName={category.name} 
            myFormUpd={myFormUpd}
          />
        </Modal>
    </Card>
  )
}