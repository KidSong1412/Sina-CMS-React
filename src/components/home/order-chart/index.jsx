import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function OrderChart () {
  const getOptions = () => {
    let option = {
      title: {
        text: '年度营收',
        textStyle: {
          color: '#ffffff',
          fontSize: '16px'
        }
      },
      xAxis: [
        {
          type: 'category',
          data: ['2022', '2021', '2020', '2019', '2018', '2017', '2016'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          show: false
        },
        {
          type: 'value',
          show: false
        }
      ],
      legend: {
        data: ['上半年', '下半年'],
        textStyle: {
          color: '#ffffff'
        },
        right: '12px',
        itemHeight: 10,
        itemWidth: 10
      },
      series: [
        {
          name: '上半年',
          type: 'bar',
          data: [
            100, 202, 305, 687, 1502, 987, 2054
          ]
        },
        {
          name: '下半年',
          type: 'bar',
          data: [
            120, 250, 365, 750, 1230, 779, 3000
          ]
        },
        {
          name: '涨幅',
          type: 'line',
          data: [
            120, 250, 365, 750, 1502, 987, 3000
          ]
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