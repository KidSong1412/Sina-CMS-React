import './App.less'
import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'
/*应用根组件
*/
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
export default App