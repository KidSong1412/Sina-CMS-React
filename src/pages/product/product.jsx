import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'
import './product.less'

export default function Product () {
  return (
    <Routes>
      <Route path="/" element={<ProductHome />} exact />
      <Route path="/addupdate" element={<ProductAddUpdate />} />
      <Route path="/detail" element={<ProductDetail />} />
      <Route path="*"  element={<Navigate to="/" />} />
    </Routes>
  )
}