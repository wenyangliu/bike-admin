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
      this.renderMap(res.result)
    })
  }

  renderMap = (result) => {
    this.map = new window.BMap.Map('orderDetailMap')
    this.map.enableScrollWheelZoom(true)
    this.addMapControl()
    this.drawBikeRoute(result.position_list)
    this.drawServiceArea(result.area)
  }

  // 添加控件
  addMapControl = () => {
    const map = this.map
    map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
    map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}))
  }
  // 绘制用户的行驶路线
  drawBikeRoute = (positionList) => {
    let map = this.map
    let startPoint = '', endPoint = '', len = positionList.length
    if (len > 0) {
      let first = positionList[0], last = positionList[len - 1]
      startPoint = new window.BMap.Point(first.lon, first.lat)
      let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36,42),
        anchor: new window.BMap.Size(18, 42)
      })
      let startMarker = new window.BMap.Marker(startPoint, {icon: startIcon})
      map.addOverlay(startMarker) // 起点

      endPoint = new window.BMap.Point(last.lon, last.lat)
      let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      })
      let endMarker = new window.BMap.Marker(endPoint, {icon: endIcon})
      map.addOverlay(endMarker) // 终点

      // 连接路线图
      const trackPoint = this.drawTrackPoint(positionList)

      let polyline = new window.BMap.Polyline(trackPoint, {
        strokeColor: '#1869AD',
        strokeWeight: 3,
        strokeOpacity: 1
      })
      map.addOverlay(polyline)
      map.centerAndZoom(endPoint, 11)
    }
  }

  // 连接路线图
  drawTrackPoint(positionList) {
    let trackPoint = [], len = positionList.length
    for (let i = 0; i < len; i++) {
      let point = positionList[i]
      trackPoint.push(new window.BMap.Point(point.lon, point.lat))
    }
    return trackPoint
  }

  // 绘制服务区
  drawServiceArea = (positionList) => {
    console.log(positionList)
    let map = this.map
    const trackPoint = this.drawTrackPoint(positionList)
    // 绘制服务区
    let polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: '#CE0000',
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity:0.4
    })
    map.addOverlay(polygon)
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
                <span className="detail-form-content">{info.mode == 1 ? '服务区' : '停车点'}</span>
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
                <span className="detail-form-content">{info.distance / 1000}公里</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }
}