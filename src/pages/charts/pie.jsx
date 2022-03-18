import React, {Component} from 'react'
import {Card} from 'antd'
import ReactECharts from 'echarts-for-react'
import './chart.less'

export default class Pie extends Component {

  getOption1 = () => {
    return {
      title: {
        text: 'Echarts 示例',
        subtext: '图一',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        extraCssText:'width:200px!important;height:60px;'
      },
      legend: {
        left: 'left',
        orient: 'vertical',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series: [
        {
          name: '数据来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ],
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
      ]
    }
  }

  getOption2 = () => {
    return {
      backgroundColor: '#2c343c',
      title: {
        text: 'Echarts 示例',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        extraCssText:'width:200px!important;height:60px;'
      },
      series: [
        {
          name: '数据来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:274, name:'联盟广告'},
            {value:235, name:'视频广告'},
            {value:400, name:'搜索引擎'}
          ].sort(function (a, b) { return a.value - b.value; }),
          label: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          roseType: 'radius',
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    }
  }
  
  render () {
    return (
      <div>
        <Card title='饼图一'>
        <ReactECharts option={this.getOption1()} style={{width: '100%', height: '500px'}} />
        </Card>
        <Card title='饼图二'>
          <ReactECharts option={this.getOption2()} style={{width: '100%', height: '500px'}} />
        </Card>
      </div>
    )
  }
}