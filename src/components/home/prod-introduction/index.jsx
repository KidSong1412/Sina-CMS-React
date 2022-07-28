import React, { Fragment } from 'react'
import './index.less'

export default function ProdIntro () {

  return (
    <Fragment>
      <h3 className='prodint-title'>Sina-CMS套餐产品说明</h3>
      <p>这是一套涵盖了PC端、移动端的全方位后台系统</p>
      <p>源码已开源于GitHub</p>
      <p>适用技术栈包括:</p>
      <p>
        <a href='#'>React18</a>
        <a href='#'>ReactNative</a>
        <a href='#'>Vue3</a>
        <a href="#">uni-app</a>
      </p>
      <p>
        <a href='#'>Koa2</a>
        <a href="#">ThinkPHP6</a>
      </p>
      <h3 className='prodint-team'>产品团队</h3>
      <p>授权:&nbsp;&nbsp;<span className='name'>欧巴</span></p>
      <p>研发:&nbsp;&nbsp;<span className='name'>SY</span></p>
      <p>更多作品请访问:</p>
      <a className='MyWeb' href="#">https://</a>
    </Fragment>
  )
}