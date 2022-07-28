import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function WelcomeChart () {
  const getOptions = () => {
    let option = {
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: 'Welcome To Sina',
              fontSize: 40,
              fontWeight: 'bold',
              lineDash: [0, 200],
              lineDashOffset: 0,
              fill: 'transparent',
              stroke: '#ffffff',
              lineWidth: 1
            },
            keyframeAnimation: {
              duration: 5000,
              loop: true,
              keyframes: [
                {
                  percent: 0.7,
                  style: {
                    fill: 'transparent',
                    lineDashOffset: 200,
                    lineDash: [200, 0]
                  }
                },
                {
                  // Stop for a while.
                  percent: 0.8,
                  style: {
                    fill: 'transparent'
                  }
                },
                {
                  percent: 1,
                  style: {
                    fill: 'white'
                  }
                }
              ]
            }
          }
        ]
      }
    }

    return option
  }

  return (
    <ReactECharts option={ getOptions() } style={{ width: '100%', height: '100%' }} />
  )
}