import React from 'react'
import { Card, Modal, Button} from 'antd'
import './index.less'

export default class Modals extends React.Component {
  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false,
  }
  handleOpen = (type)=> {
    this.setState({
      [type]: true
    })
  }
  handleOk = ()=> {

  }
  handleCancel = (type)=> {
    this.setState({
      [type]: false
    })
  }

  handleConfirm = (type)=> {
    Modal[type]({
      title: '确认',
      content: '你确认学会React了吗？',
      onOk() {
        console.log('ok')
      },
      onCancel() {
        console.log('cancel')
      }
    })
  }

  render() {
    return (
      <div>
        <Card title="基础模态框" className="card">
          <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open</Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹框</Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
        </Card>

        {/*Modal1*/}
        <Modal
          title="React"
          visible={this.state.showModal1}
          onOk={this.handleOk}
          onCancel={() => this.handleCancel('showModal1')}
        >
          <p>今天学习React了吗</p>
        </Modal>
        {/*Modal2*/}
        <Modal
          title="React"
          visible={this.state.showModal2}
          onOk={this.handleOk}
          onCancel={() => this.handleCancel('showModal2')}
          okText="好的"
          cancelText="算了"
        >
          <p>今天学习React了吗</p>
        </Modal>
        {/*Modal3*/}
        <Modal style={{top: 20}}
          title="React"
          visible={this.state.showModal3}
          onOk={this.handleOk}
          onCancel={() => this.handleCancel('showModal3')}
        >
          <p>今天学习React了吗</p>
        </Modal>
        {/*Modal4*/}
        <Modal
          wrapClassName="vertical-center-modal"
          title="React"
          visible={this.state.showModal4}
          onOk={this.handleOk}
          onCancel={() => this.handleCancel('showModal4')}
        >
          <p>今天学习React了吗</p>
        </Modal>

        <Card title="信息确认框" className="card">
          <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
          <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
          <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
          <Button type="primary" onClick={() => this.handleConfirm('error')}>Error</Button>
          <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
        </Card>
      </div>
    )
  }
}