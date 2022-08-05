import React, { forwardRef } from 'react'
import ReactECharts from 'echarts-for-react'
import 'echarts-gl'

export default forwardRef(function EarchChart (props, earthRef) {
  const getOptions = () => {
    let option = {
      backgroundColor: '#000',
      globe: {
        baseTexture: 'https://oss.cloud.zj.sina.com.cn/imgs/React-Sina-CMS/world.topo.bathy.200401.jpg',
        heightTexture: 'https://oss.cloud.zj.sina.com.cn/imgs/React-Sina-CMS/world.topo.bathy.200401.jpg',
        displacementScale: 0.04,
        shading: 'realistic',
        environment: 'https://oss.cloud.zj.sina.com.cn/imgs/React-Sina-CMS/starfield.jpg',
        realisticMaterial: {
          roughness: 0.9
        },
        postEffect: {
          enable: true
        },
        light: {
          main: {
            intensity: 5,
            shadow: true
          },
          ambientCubemap: {
            texture: 'https://oss.cloud.zj.sina.com.cn/imgs/React-Sina-CMS/pisa.hdr',
            diffuseIntensity: 0.2
          }
        }
      }
    }

    return option
  }


  return (
    <ReactECharts option={ getOptions() } style={{ width: '100%', height: '100%', borderRadius: '16px' }} />
  )
})