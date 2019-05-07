import React from 'react'
import {Row, Col} from 'antd'
import './index.less'
import utils from '../../utils'
import axios from '../../axios'
import config from '../../config'

export default class Header extends React.Component {
  componentWillMount() {
    this.setState({
      userName: '文道诗洋'
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

  render() {
    const menuType = this.props.menuType
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
            <a href="#" style={{color: 'red'}}>退出</a>
          </Col>
        </Row>
        {
          menuType ? '' :
            <Row className='breadcrumb'>
              <Col span={4} className='breadcrumb-title'>
                首页
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