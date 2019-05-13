import React from 'react'
import {Row, Col, Modal} from 'antd'
import './index.less'
import utils from '../../utils'
import axios from '../../axios'
import config from '../../config'
import {connect} from 'react-redux'

class Header extends React.Component {
  state = {}
  componentWillMount() {
    this.setState({
      userName: '文道诗洋',
      isExist: false
    })
    setInterval(() => {
      let sysTime = utils.formateDate()
      this.setState({
        sysTime
      })
    }, 1000)

    this.getWeatherAPIData()
  }

  componentDidMount() {
  }

  // 获取天气信息
  getWeatherAPIData() {
    let city = '南京'
    const url = `${config.weather_api}?location=${encodeURIComponent(city)}&output=json&ak=${config.baidu_ak}`
    axios.jsonp({url}).then((res) => {
      if (res.status === 'success') {
        let data = res.results[0].weather_data[0];
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          weather: data.weather
        })
      }
    })
  }
  handleExist = () => {
    Modal.confirm({
      content: '是否确认退出系统',
      onOk() {
        window.location.href = '/#/login/'
      }
    })
  }

  render() {
    const {menuName, menuType} = this.props
    return (
      <div className='header'>
        <Row className='header-top'>
          {
            menuType ?
              <Col span={6} className="logo">
                <img src="/assets/logo-ant.svg" alt=""/>
                <span>Bike 通用管理系统</span>
              </Col> : ''
          }

          <Col span={menuType ? 18 : 24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#" style={{color: 'red'}} onClick={this.handleExist}>退出</a>
          </Col>
        </Row>
        {
          menuType ? '' :
            <Row className='breadcrumb'>
              <Col span={4} className='breadcrumb-title'>
                {menuName || '首页'}
              </Col>
              <Col span={20} className='breadcrumb-right'>
                <span className='date'>{this.state.sysTime}</span>
                <span className="weather-img"><img src={this.state.dayPictureUrl} alt=""/></span>
                <span className="weather-detail">{this.state.weather}</span>
              </Col>
            </Row>
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    menuName: state.menuName
  }
};
export default connect(mapStateToProps)(Header)