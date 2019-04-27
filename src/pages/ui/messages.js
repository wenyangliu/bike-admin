import React from 'react'
import { Card, message, Button } from 'antd'
import './index.less'

export default class Messages extends React.Component {
  render() {
      const success = () => {
        message.success('This is message of success')
      }
      const info = () => {
        message.info('This is message of info')
      }
      const warning = () => {
        message.warning('This is message of warning')
      }
      const error = () => {
        message.error('This is message of error')
      }
      const loading = () => {
        const hide = message.loading('恭喜你学习React到现在', 0)
        setTimeout(hide, 2000)
      }
      return (
      <div>
        <Card title="全局提示框" className="card">
          <Button type="primary" onClick={success}>Success</Button>
          <Button type="primary" onClick={info}>Info</Button>
          <Button type="primary" onClick={warning}>Warning</Button>
          <Button type="primary" onClick={error}>Error</Button>
          <Button type="primary" onClick={loading}>Loading</Button>
        </Card>
      </div>
    )
  }
}