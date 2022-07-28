import React, { lazy, Suspense } from 'react'
import { Card, Row, Col } from 'antd'
import './home.less'
import IncomeChart from '../../components/home/income-chart'
import OrderChart from '../../components/home/order-chart'
import TargetChart from '../../components/home/target-chart'
import WelcomeChart from '../../components/home/welcome-chart'
import Wait from '../../components/wati'
import ProdIntro from '../../components/home/prod-introduction'
import LayerChart from '../../components/home/layer-chart'
//方案二，关于React中Echarts图表变形问题
const EarthChart = lazy(() => import('../../components/home/earth-chart'))

export default function Home() {

  const titleCircularDouble = (
    <div className='wrap'>
      <div className='mid'>
        <div className='ins'></div>
      </div>
    </div>
  )
  return (
    <Card bordered={false}>
      <Row gutter={20}>
        <Col span={6}>
          <Row className='home-layout-top'>
            <Col className='title' span={6}>
              {titleCircularDouble}
            </Col>
            <Col span={18} className="chart">
              <IncomeChart />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row className='home-layout-top'>
            <Col className='title' span={6}>
              {titleCircularDouble}
            </Col>
            <Col span={18} className="chart">
              <OrderChart />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row className='home-layout-top'>
            <Col className='title' span={6}>
              {titleCircularDouble}
            </Col>
            <Col span={18} className="chart">
              <TargetChart />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row className='home-layout-top'>
            <Col span={24}>
              <WelcomeChart />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='home-layout-mid' gutter={20}>
        <Col className='mid-prod' span={6}>
          <ProdIntro />
        </Col>
        <Col className='mid-earth' span={12}>
          <Suspense fallback={<Wait />}>
            <EarthChart />
          </Suspense>
        </Col>
        <Col className='mid-layer' span={6}>
          <LayerChart />
        </Col>
      </Row>
    </Card>
  )
}