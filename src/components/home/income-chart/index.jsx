import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function IncomeChart () {
  const getOptions = () => {
    let option = {
      title: {
        text: '周期收益',
        textStyle: {
          color: '#ffffff',
          fontSize: '16px'
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [
        {
          data: [250, 100, 60, 400, 90, 300, 520],
          type: 'line',
          areaStyle: {
            color: '#9387eb'
          },
          smooth: true,
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            opacity: 0
          }
        }
      ],
      grid: [
        {
          left: '8px',
          bottom: '16px',
          right: '12px',
          top: '24px'
        }
      ]
    }

    return option
  }

  return (
    <ReactECharts option={ getOptions() } style={{ width: '100%', height: '100%' }} />
  )
}