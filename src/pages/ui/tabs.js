import React from 'react'
import { Card, Tabs, Icon } from 'antd'
import './index.less'
const TabPane = Tabs.TabPane

export default class Tab extends React.Component {
  render() {
      const icon1 = <Icon type="apple" />
      const icon2 = <Icon type="android" />
      return (
      <div>
        <Card title="Tab页签" className="card">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">Tab 1</TabPane>
            <TabPane tab="Tab 2" disabled key="2">Tab 2</TabPane>
            <TabPane tab="Tab 3" key="3">Tab 3</TabPane>
          </Tabs>
        </Card>

        <Card title="Tab带图标页签" className="card">
          <Tabs defaultActiveKey="2">
            <TabPane tab={<span>{icon1}Tab 1</span>} key="1">Tab 1</TabPane>
            <TabPane tab={<span>{icon2}Tab 2</span>} key="2">Tab 2</TabPane>
          </Tabs>
        </Card>

        <Card title="Tab可关闭卡片式页签" className="card">
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span>{icon1}Tab 1</span>} key="1">Tab 1</TabPane>
            <TabPane tab={<span>{icon2}Tab 2</span>} key="2">Tab 2</TabPane>
          </Tabs>
        </Card>

      </div>
    )
  }
}