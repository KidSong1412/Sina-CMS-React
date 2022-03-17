import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Select, Input, Button, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { PAGE_SIZE } from '../../utils/constants'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import LinkButton from '../../components/link-button'

const Option = Select.Option

export default function ProductHome () {
  const navigate = useNavigate()

  const [searchType, setSearchType] = useState('productName')
  const [searchName, setSearchName] = useState('')
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0) //总页数
  const [products, setProducts] = useState([])
  const [pageNum, setPageNum] = useState(1) //当前页数
  const initColumns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (price) => '￥' + price
    },
    {
      width: 100,
      title: '状态',
      render: (product) => {
        const {status, _id} = product
        const newStatus = status === 1 ? 2 : 1
        return (
          <span>
            <Button
              type='primary'
              onClick={() => updateStatus(_id, newStatus)}
            >
              {status === 1 ? '下架' : '上架'}
            </Button>
            <span>{status === 1 ? '在售' : '已下架'}</span>
          </span>
        )
      }
    },
    {
      width: 100,
      title: '操作',
      render: (product) => {
        return (
          <span>
            <LinkButton onClick={() => navigate('/products/product/detail', {state: product})}>详情</LinkButton>
            <LinkButton onClick={() => navigate('/products/product/addupdate', {state: product})}>修改</LinkButton>
          </span>
        )
      }
    }
  ]

  useEffect(() => {
    getProducts(pageNum)
  }, [])

  const getProducts = async (pageNum) => {
    setPageNum(pageNum)
    setLoading(true)
    let result
    if (searchName) {
      result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
    } else {
      result = await reqProducts(pageNum, PAGE_SIZE)
    }
    setLoading(false)
    if (result.status === 0) {
      const {total, list} = result.data
      setTotal(total)
      setProducts(list)
    }
  }

  const updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    if (result.status === 0) {
      message.success('商品状态更新成功')
      getProducts(pageNum)
    }
  }

  const title = (
    <span>
      <Select
        value={searchType}
        style={{width: 150}}
        onChange={value => setSearchType(value)}
      >
        <Option value='productName'>按名称搜索</Option>
        <Option value='productDesc'>按描述搜索</Option>
      </Select>
      <Button type='primary'>搜索</Button>
    </span>
  )
  const extra = (
    <Button type='primary' onClick={() => navigate('/products/product/addupdate')}>
      <PlusOutlined />
      添加商品
    </Button>
  )

  return (
    <Card title={title} extra={extra}>
      <Table
        bordered
        rowKey='_id'
        loading={loading}
        dataSource={products}
        columns={initColumns}
        pagination={{
          current: pageNum,
          total,
          defaultPageSize: PAGE_SIZE,
          showQuickJumper: true,
          onChange: getProducts
        }}
      />
    </Card>
  )
}