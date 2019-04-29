import React from 'react'
import { Card, Tabs, Icon } from 'antd'
import './index.less'
const TabPane = Tabs.TabPane

export default class Tab extends React.Component {
  newTabIndex = 0;
  componentWillMount() {
    const panes = [
      {title: 'Tab 1', content: 'Content of Tab 1', key: '1'},
      {title: 'Tab 2', content: 'Content of Tab 2', key: '2'},
      {title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false}
    ]
    this.setState({
      activeKey: panes[0].key,
      panes
    })
  }
  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  }
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
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {this.state.panes.map(pane =>
              <TabPane tab={pane.title} key={pane.key} colsable={pane.closable}>{pane.content}</TabPane>
            )}
          </Tabs>
        </Card>

      </div>
    )
  }
}