import React from 'react'
import { Card, Button, Icon, Radio } from 'antd'
import './index.less'
const ButtonGroup = Button.Group
const RadioGroup = Radio.Group

export default class Buttons extends React.Component {
  state = {
    loading: true,
    size: 'default'
  }
  handleCloseLoading = ()=> {
    this.setState({
      loading: false
    })
  }
  handleOpenLoading = ()=> {
    this.setState({
      loading: true
    })
  }
  handleChangeSize = (e)=> {
    this.setState({
      size: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Card title="基础按钮" className="card">
          <Button type="primary">React</Button>
          <Button>React</Button>
          <Button type="dashed">React</Button>
          <Button type="danger">React</Button>
          <Button disabled>React</Button>
        </Card>

        <Card title="图形按钮" className="card">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button type="circle" icon="search"></Button>
          <Button type="primary" icon="search">搜索</Button>
          <Button type="primary" icon="download">下载</Button>
        </Card>

        <Card title="Loading按钮" className="card">
          <Button type="primary" loading={this.state.loading}>确定</Button>
          <Button type="circle" loading={this.state.loading}></Button>
          <Button loading={this.state.loading} onClick={this.handleOpenLoading}>点击加载</Button>
          <Button type="circle" loading={this.state.loading}></Button>
          <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
        </Card>

        <Card title="按钮组" style={{marginBottom: 10}}>
          <ButtonGroup>
            <Button type="primary">
              <Icon type="left" />返回
            </Button>
            <Button type="primary">
              前进<Icon type="right" />
            </Button>
          </ButtonGroup>
        </Card>

        <Card title="按钮尺寸" className="card">
          <RadioGroup defaultValue="default" onChange={this.handleChangeSize}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>

            <Button type="primary" size={this.state.size}>React</Button>
            <Button size={this.state.size}>React</Button>
            <Button type="dashed" size={this.state.size}>React</Button>
            <Button type="danger" size={this.state.size}>React</Button>
          </RadioGroup>
        </Card>
      </div>
    )
  }
}