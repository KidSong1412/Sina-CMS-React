import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function IncomeChart () {
  const getOptions = () => {
    let option = {
      title: {
        text: '周期收益',
        textStyle: {
          color: '#ffffff',
          fontSize: '20px'
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
          left: '10px',
          bottom: '20px',
          right: '15px',
          top: '30px'
        }
      ]
    }

    return option
  }

  return (
    <ReactECharts option={ getOptions() } style={{ width: '100%', height: '100%' }} />
  )
}