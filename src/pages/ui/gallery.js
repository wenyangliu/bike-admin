import React from 'react'
import { Card, Row, Col, Modal } from 'antd'
import './index.less'
import imgs from './gallery.mock'

export default class Gallery extends React.Component {
  state = {
    visible: false
  }
  openGallery = (imgSrc) => {
    this.setState({
      visible: true,
      currentImg: '/gallery/' + imgSrc
    })
  }
  render() {
      const imgList = imgs.map(list => list.map(item =>
        <Card
          style={{marginBottom: 10}}
          cover={<img src={'./gallery/' + item.img} onClick={()=>this.openGallery(item.img)}/>}
        >
          <Card.Meta
            title={item.title}
            description={item.description}
          />
        </Card>
      ))
      return (
      <div>
        <Row gutter={10}>
          <Col span={5}>
            {imgList[0]}
          </Col>
          <Col span={5}>
            {imgList[1]}
          </Col>
          <Col span={5}>
            {imgList[2]}
          </Col>
          <Col span={5}>
            {imgList[3]}
          </Col>
          <Col span={4}>
            {imgList[4]}
          </Col>
        </Row>

        <Modal
          width={300}
          height={500}
          visible={this.state.visible}
          title="图片画廊"
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
          footer={null}
        >
          <img src={this.state.currentImg} alt="" style={{width: '100%'}}/>
        </Modal>
      </div>
    )
  }
}