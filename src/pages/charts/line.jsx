import React, {Component} from 'react'
import {Card, Button} from 'antd'
import ReactECharts from 'echarts-for-react'
import './chart.less'

export default class Line extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    stores: [6, 10, 25, 20, 15, 10],
  }

  update = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale + 1),
      stores: state.stores.map(store => store - 1)
    }))
  }

  getOption = (sales, stores) => {
    return {
      title: {
        text: 'Echarts 示例'
      },
      legend: {
        data: ['销量', '库存'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '销量',
          data: sales,
          type: 'line'
        },
        {
          name: '库存',
          data: stores,
          type: 'line'
        }
      ]
    }
  }

  render () {
    const {sales, stores} = this.state
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.update}>更新</Button>
        </Card>
        <Card title="折线图一">
        <ReactECharts option={this.getOption(sales, stores)} style={{width: '100%', height: '500px'}} />
        </Card>
      </div>
    )
  }
}