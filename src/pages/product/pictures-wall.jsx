import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import { BASE_IMG_URL } from '../../utils/constants'
import { reqDeleteImg } from '../../api'

export default class PicturesWall extends Component {
  constructor (props) {
    super(props)
    let fileList = []
    const {imgs} = this.props
    if (imgs && imgs.length>0) {
      fileList = imgs.map((img, index) => ({
        uid: index,
        name: img,
        status: 'done',
        url: BASE_IMG_URL + img
      }))
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList
    }
  }

  //向父组件传递暴露方法
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  handleChange = async ({ file, fileList }) =>{
    //上传成功，修改file信息
    if (file.status === 'done') {
      const result = file.response
      if (result.status === 0) {
        message.success('上传图片成功!')
        const { name, url } = result.data
        file.name = name
        file.url = url
      } else {
        message.error('上传图片失败')
      }
    } else if (file.status === 'removed') {
      const result = await reqDeleteImg(file.name)
      if (result.status === 0) {
        message.success('删除图片成功!')
      } else {
        message.error('删除图片失败!')
      }
    }
    this.setState({ fileList })
  }

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleCancel = () => {
    this.setState({ previewVisible: false })
  }

  render () {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <CloudUploadOutlined />
        <div>Upload</div>
      </div>
    )
  
    return (
      <div>
        <Upload
          action="/manage/img/upload"
          accept="image/*"
          name='image'
          listType='picture-card'
          fileList={fileList}
          onChange={this.handleChange}
          onPreview={this.handlePreview}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="preview" style={{ width: '100%' }} src={previewImage} />  
        </Modal>
      </div>
    )
  }
}