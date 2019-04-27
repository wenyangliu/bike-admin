import React from 'react'
import { Card, notification, Button } from 'antd'
import './index.less'

export default class Notification extends React.Component {
    notification = (type)=> {
      notification[type]({
        message: '通知',
        description: '这是一条通知信息！！！',
        onClick() {
          console.log('click!')
        }
      })
    }
  notification2 = (type, placement)=> {
    notification[type]({
      message: '通知',
      description: '这是一条通知信息！！！',
      placement,
      onClick() {
        console.log('click!')
      }
    })
  }

  render() {
      return (
      <div>
        <Card title="通知提醒框" className="card">
          <Button type="primary" onClick={() => this.notification('success')}>Success</Button>
          <Button type="primary" onClick={() => this.notification('info')}>Info</Button>
          <Button type="primary" onClick={() => this.notification('warning')}>Warning</Button>
          <Button type="primary" onClick={() => this.notification('error')}>Error</Button>
        </Card>

        <Card title="通知提醒框-方向控制" className="card">
          <Button type="primary" onClick={() => this.notification2('success', 'topLeft')}>Success-TopLeft</Button>
          <Button type="primary" onClick={() => this.notification2('info', 'topRight')}>Info-TopRight</Button>
          <Button type="primary" onClick={() => this.notification2('warning', 'bottomLeft')}>Warning-BottomLeft</Button>
          <Button type="primary" onClick={() => this.notification2('error', 'bottomRight')}>Error-BottomRight</Button>
        </Card>
      </div>
    )
  }
}