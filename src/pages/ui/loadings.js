import React from 'react'
import { Card, Spin, Icon, Alert} from 'antd'
import './index.less'

export default class Loadings extends React.Component {

    render() {
      const icon = <Icon type="loading" style={{ fontSize: 24 }} />
      return (
      <div>
        <Card title="Spin用法" className="card">
          <Spin size="small" />
          <Spin style={{margin: '0 10px'}} />
          <Spin size="large"/>
          <Spin indicator={icon} style={{marginLeft: 10}}></Spin>
        </Card>

        <Card title="内容遮罩" className="card">
          <Alert className="alert"
           message="React"
           description="欢迎学习React！"
           type="info"
          />

          <Spin>
            <Alert className="alert"
              message="React"
              description="欢迎学习React！"
              type="info"
            />
          </Spin>

          <Spin tip="加载中...">
            <Alert className="alert"
              message="React"
              description="欢迎学习React！"
              type="info"
            />
          </Spin>

          <Spin indicator={icon}>
            <Alert className="alert"
              message="React"
              description="欢迎学习React！"
              type="info"
            />
          </Spin>
        </Card>
      </div>
    )
  }
}