import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card, List } from 'antd'
import LinkButton from '../../components/link-button'
import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategory } from '../../api'
import { LeftOutlined } from '@ant-design/icons'

const Item = List.Item

export default function ProductDetail () {
  const navigate = useNavigate()
  const location = useLocation()
  const {name, desc, price, detail, imgs} = location.state
  const [cName1, setCName1] = useState('')
  const [cName2, setCName2] = useState('')

  useEffect(async () => {
    const {pCategoryId, categoryId} = location.state
    if (pCategoryId === '0') {
      const result = await reqCategory(categoryId)
      setCName1(result.data.name)
    } else {
      const result = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
      setCName1(result[0].data.name)
      setCName2(result[1].data.name)
    }
  }, [cName1, cName2])

  const title = (
    <span>
      <LinkButton>
        <LeftOutlined onClick={() => navigate(-1)} style={{marginRight: 10, fontSize: 20}} />
      </LinkButton>
      <span>商品详情</span>
    </span>
  )

  return (
    <Card title={title} className='product-detail'>
      <List>
        <Item>
          <span className="left">商品名称:</span>
          <span>{name}</span>
        </Item>
        <Item>
          <span className="left">商品描述:</span>
          <span>{desc}</span>
        </Item>
        <Item>
          <span className="left">商品价格:</span>
          <span>{price}元</span>
        </Item>
        <Item>
          <span className="left">所属分类:</span>
          <span>{cName1}{cName2 ? '-->' + cName2 : ''}</span>
        </Item>
        <Item>
          <span className="left">商品图片:</span>
          <span>
            {imgs.map(img => (
              <img
                key={img}
                src={BASE_IMG_URL + img}
                className="product-img"
                alt="img"
              />
            ))}
          </span>
        </Item>
        <Item>
          <span className="left">商品详情:</span>
          <span dangerouslySetInnerHTML={{__html: detail}}></span>
        </Item>
      </List>
    </Card>
  )
}