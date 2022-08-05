import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function TargetChart () {
  const getOptions = () => {
    let option = {
      title: {
        text: '小目标',
        textStyle: {
          color: '#ffffff',
          fontSize: '16px'
        }
      },
      legend: {
        textStyle: {
          color: '#ffffff'
        },
        right: '12px'
      },
      grid: [
        {
          left: '8px',
          bottom: '16px',
          right: '12px',
          top: '24px'
        }
      ],
      xAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dotted',
            color: 'rgba(255, 255, 255, 0.5)'
          }
        }
      },
      yAxis: {
        type: 'category',
        show: false
      },
      series: [
        {
          name: '已完成',
          type: 'bar',
          stack: 'total',
          barWidth: 16,
          data: [350],
          itemStyle: {
            color: '#45c946'
          }
        },
        {
          name: '计划',
          type: 'bar',
          stack: 'total',
          data: [200],
          itemStyle: {
            color: '#eee'
          }
        }
      ]
    }

    return option
  }

  return (
    <ReactECharts option={ getOptions() } style={{ width: '100%', height: '100%' }} />
  )
}