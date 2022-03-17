import React, { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, message, Cascader } from 'antd'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
import LinkButton from '../../components/link-button'
import { reqCategorys, reqAddOrUpdateProduct } from '../../api'
import { LeftOutlined } from '@ant-design/icons'

const {Item} = Form
const {TextArea} = Input

export default function ProductAddUpdate () {
  const location = useLocation()
  const navigate = useNavigate()
  const [addForm] = Form.useForm()
  const [product, setProduct] = useState(() => {
    return location.state || {}
  })
  const [isUpdate, setIsUpdate] = useState(() => {
    return !!product
  })
  const initOptions = async (categorys) => {
    //根据categorys生成options数组
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }))
    //如果是二级分类商品更新
    const { pCategoryId } = product
    if (isUpdate && !!pCategoryId && pCategoryId !== '0') {
      const subCategorys = await getCategorys(pCategoryId)
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      const targetOption = options.find(option => option.value === pCategoryId)
      console.log(targetOption)
      targetOption.children = childOptions
    }
    setOptions(options)
  }
  //异步获取一级/二级分类列表
  const getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)
    if (result.status == 0) {
      const categorys = result.data
      if (parentId == 0) {
        initOptions(categorys)
      } else {
        return categorys
      }
    }
  }
  const [options, setOptions] = useState(() => {
    getCategorys('0')
  })

  const loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    const subCategorys = await getCategorys(targetOption.value)
    targetOption.loading = false
    if (subCategorys && subCategorys.length > 0) {
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      targetOption.children = childOptions
    } else {
      targetOption.isLeaf = true
    }
    setOptions([...options])
  }

  const [categoryIds, setCategoryIds] = useState(() => {
    const {pCategoryId, categoryId} = product
    let cateIds = []
    if (isUpdate) {
      if (pCategoryId === '0') {
        cateIds.push(categoryId)
      } else {
        cateIds.push(pCategoryId)
        cateIds.push(categoryId)
      }
    }
    return cateIds
  })

  const pw = useRef()
  const editor = useRef()

  const submit = () => {
    addForm.validateFields().then( async values => {
      const { name, desc, price, categoryIds } = values
      let pCategoryId, categoryId
      if (categoryIds.length === 1) {
        pCategoryId = '0'
        categoryId = categoryIds[0]
      } else {
        pCategoryId = categoryIds[0]
        categoryId = categoryIds[1]
      }
      const imgs = pw.current.getImgs()
      const detail = editor.current.getDetail()
      const resProduct = { name, desc, price, imgs, detail, pCategoryId, categoryId }
      if (isUpdate) {
        resProduct._id = product._id
      }
      const result = await reqAddOrUpdateProduct(resProduct)
      if (result.status === 0) {
        message.success(`${isUpdate ? '更新' : '添加'}商品成功!`)
        navigate(-1)
      } else {
        message.error(`${isUpdate ? '更新' : '添加'}商品失败!`)
      }
    }).catch(errorInfo => {
      console.log(errorInfo)
    })
  }

  const title = (
    <span>
      <LinkButton onClick={() => navigate(-1)}>
        <LeftOutlined style={{fontSize: 20}} />
      </LinkButton>
      <span>{isUpdate ? '修改商品' : '添加商品'}</span>
    </span>
  )

  return (
    <Card title={title}>
      <Form
        form={addForm}
        labelCol={{span: 2}}
        wrapperCol={{span: 8}}
      >
        <Item
          label="商品名称"
          name="name"
          initialValue={product.name}
          rules={[{ required: true, message: '必须输入商品名称' }]}
        >
          <Input placeholder='请输入商品名称' />
        </Item>
        <Item
          label="商品描述"
          name="desc"
          initialValue={product.desc}
          rules={[{ required: true, message: '必须输入商品描述' }]}
        >
          <TextArea placeholder='请输入商品描述' autoSize={{ minRows: 2, maxRows: 6 }} />
        </Item>
        <Item
          label="商品价格"
          name="price"
          initialValue={product.price}
          rules={[{ required: true, message: '必须输入商品价格' }]}
        >
          <Input type='number' placeholder='请输入商品价格' addonAfter='元' />
        </Item>
        <Item
          label="商品分类"
          name="categoryIds"
          initialValue={categoryIds}
          rules={[{ required: true, message: '必须指定商品分类' }]}
        >
          <Cascader
            placeholder='请指定商品分类'
            options={options}
            loadData={loadData}
          />
        </Item>
        <Item label="商品图片">
           <PicturesWall ref={pw} imgs={product.imgs} /> 
        </Item>
        <Item label="商品详情" labelCol={{span: 2}} wrapperCol={{span: 20}}>
          <RichTextEditor ref={editor} detail={product.detail} />
        </Item>
        <Item>
          <Button type='primary' onClick={submit}>提交</Button>
        </Item>
      </Form>
    </Card>
  )
}