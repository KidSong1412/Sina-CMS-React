import React from 'react'
import Login from '../pages/login/login'
import Admin from '../pages/admin/admin'
import Category from '../pages/category/category'
import Role from '../pages/role/role'
import User from '../pages/user/user'
import Product from '../pages/product/product'
import Bar from '../pages/charts/bar'
import Line from '../pages/charts/line'
import Pie from '../pages/charts/pie'
import Home from '../pages/home/home'
import ProductHome from '../pages/product/home'
import ProductAddUpdate from '../pages/product/add-update'
import ProductDetail from '../pages/product/detail'
import { useRoutes, Navigate } from 'react-router-dom'

const RoutesMap = () => {
  const routes = useRoutes([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/',
      element: <Admin />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'products/category',
          element: <Category />
        },
        {
          path: 'role',
          element: <Role />
        },
        {
          path: 'user',
          element: <User />
        },
        {
          path: 'products/product',
          element: <Product />,
          children: [
            {
              path: '',
              element: <ProductHome />
            },
            {
              path: 'addupdate',
              element: <ProductAddUpdate />
            },
            {
              path: 'detail',
              element: <ProductDetail />
            },
            {
              path: '*',
              element: <Navigate to="/" />
            }
          ]
        },
        {
          path: 'charts/bar',
          element: <Bar />
        },
        {
          path: 'charts/line',
          element: <Line />
        },
        {
          path: 'charts/pie',
          element: <Pie />
        }
      ]
    }
  ])
  return routes
}

export default RoutesMap