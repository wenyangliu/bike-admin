import React from 'react'
import {Menu} from 'antd'
import {NavLink} from 'react-router-dom'
import MenuConfig from '../../config/menuConfig'
import './index.less'
import {switchMenu} from "../../redux/action";
import {connect} from 'react-redux'
const SubMenu = Menu.SubMenu

class NavLeft extends React.Component {
  state = {currentKey: ''}
  componentWillMount(){
    const menuTreeNode = this.renderMenu(MenuConfig)
    this.setState({
      menuTreeNode,
      currentKey: window.location.hash.replace(/#/g, '')
    })
  }
  handleClick = ({item, key}) => {
    if (key === this.state.currentKey) return false
    const {dispatch} = this.props
    dispatch(switchMenu(item.props.title))
    this.setState({
      currentKey: key
    })
  }

  handleHomeClick = () => {
    const {dispatch} = this.props
    dispatch(switchMenu('首页'))
    this.setState({
      currentKey: ''
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
      return <Menu.Item key={item.key} title={item.title}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
    })
  }

  render() {
    return (
      <div className="nav_left">
        <NavLink to='/home' onClick={this.handleHomeClick}>
          <div className='logo'>
            <img src="/assets/logo-ant.svg" alt=""/>
            <h2>Bike Admin</h2>
          </div>
        </NavLink>

        <Menu
          theme='dark'
          selectedKeys={this.state.currentKey}
          onClick={this.handleClick}
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}

export default connect()(NavLeft)