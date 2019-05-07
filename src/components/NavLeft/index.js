import React from 'react'
import {Menu} from 'antd'
import {NavLink} from 'react-router-dom'
import MenuConfig from '../../config/menuConfig'
import './index.less'
const SubMenu = Menu.SubMenu

export default class NavLeft extends React.Component {
  componentWillMount(){
    const menuTreeNode = this.renderMenu(MenuConfig)
    this.setState({
      menuTreeNode
    })
  }
  // 菜单渲染
  renderMenu = (data) => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
    })
  }

  render() {
    return (
      <div className="nav_left">
        <div className='logo'>
          <img src="/assets/logo-ant.svg" alt=""/>
          <h2>Bike Admin</h2>
        </div>
        <Menu theme='dark'>
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}