import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function LayerChart () {
  const getOptions = () => {
    let option = {
      title: {
        text: '公司层级',
        textStyle: {
          color: '#ffffff',
          fontSize: '20px'
        }
      },
      textStyle: {
        color: '#ffffff',
        fontWeight: 'bold'
      },
      series: [
        {
          name: 'Funnel',
          type: 'funnel',
          left: '10%',
          bottom: 20,
          top: 60,
          width: '80%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: [
            { value: 60, name: 'Visit' },
            { value: 40, name: 'Inquiry' },
            { value: 20, name: 'Order' },
            { value: 80, name: 'Click' },
            { value: 100, name: 'Show' }
          ]
        }
      ]
    }

    return option
  }

  return (
    <ReactECharts option={ getOptions() } style={{ width: '100%', height: '100%' }} />
  )
}