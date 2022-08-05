import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function LayerChart () {
  const getOptions = () => {
    let option = {
      title: {
        text: '公司层级',
        textStyle: {
          color: '#ffffff',
          fontSize: '16px'
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
          left: '18%',
          bottom: 16,
          top: 48,
          width: '64%',
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
              fontSize: 16
            }
          },
          data: [
            { value: 60, name: 'Minister' },
            { value: 40, name: 'Leader' },
            { value: 20, name: 'O' },
            { value: 80, name: 'Chief Inspector' },
            { value: 100, name: 'Boss' }
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