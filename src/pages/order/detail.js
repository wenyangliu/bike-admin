import React from 'react'
import {Card} from 'antd'
import axios from '../../axios'
import './detail.less'

export default class OrderDetail extends React.Component {
  state = {}

  componentWillMount() {
    const orderId = this.props.match.params.orderId
    console.log('orderId', orderId)
    this.getOrderInfo(orderId)
  }

  getOrderInfo = (orderId) => {
    axios.ajax({
      url: '/order/detail',
      data: {
        params: {orderId}
      }
    }).then(res => {
      this.setState({
        orderInfo: res.result
      })
    })
  }

  render() {
    const info = this.state.orderInfo || {}
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map"></div>

          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <span className="detail-form-left">用车模式</span>
                <span className="detail-form-content">{info.mode == 1 ?'服务区':'停车点'}</span>
              </li>
              <li>
                <span className="detail-form-left">订单编号</span>
                <span className="detail-form-content">{info.order_sn}</span>
              </li>
              <li>
                <span className="detail-form-left">车辆编号</span>
                <span className="detail-form-content">{info.bike_sn}</span>
              </li>
              <li>
                <span className="detail-form-left">用户姓名</span>
                <span className="detail-form-content">{info.user_name}</span>
              </li>
              <li>
                <span className="detail-form-left">手机号码</span>
                <span className="detail-form-content">{info.mobile}</span>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <span className="detail-form-left">行程起点</span>
                <span className="detail-form-content">{info.start_location}</span>
              </li>
              <li>
                <span className="detail-form-left">行程终点</span>
                <span className="detail-form-content">{info.end_location}</span>
              </li>
              <li>
                <span className="detail-form-left">行驶里程</span>
                <span className="detail-form-content">{info.distance/1000}公里</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }
}