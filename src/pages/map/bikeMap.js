import React from 'react'
import { Card } from 'antd'
import BaseForm from '../../components/BaseForm'
import {formList} from "./filterList"
import axios from '../../axios'

export default class BikeMap extends React.Component {
  state = {}
  params = {}
  handleFilterSubmit = () => {

  }
  componentDidMount() {
    this.requestList()
  }
  requestList = () => {
    axios.ajax({
      url: '/map/bike_list',
      data: {params: this.params}
    }).then(res => {
      console.log(res)
      this.setState({
        total_count: res.result.total_count
      })
      this.renderMap(res.result)
    })
  }

  renderMap = (result) => {
    this.map = new window.BMap.Map('container')
    this.map.enableScrollWheelZoom(true)
    // this.map.centerAndZoom('北京', 11)
    this.addControls()
    this.drawRouteLine(result)
    this.drawBikePoint(result)
    this.drawServiceArea(result)
  }

  // 添加控件
  addControls() {
    this.map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}))
    this.map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}))
  }

  // 绘制路线图
  drawRouteLine(result) {
    const list = result.route_list
    const gps1 = list[0].split(','), gps2 = list[list.length - 1].split(',')
    const startPoint = new window.BMap.Point(gps1[0], gps1[1])
    const endPoint = new window.BMap.Point(gps2[0], gps2[1])
    const map = this.map
    const sIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(10, 25)
    })
    const eIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(10, 25)
    })
    const startMarker = new window.BMap.Marker(startPoint, {icon: sIcon})
    const endMarker = new window.BMap.Marker(endPoint, {icon: eIcon})
    map.addOverlay(startMarker)
    map.addOverlay(endMarker)

    const points = []
    list.map(it => {
      const point = it.split(',')
      points.push(new window.BMap.Point(point[0], point[1]))
    })
    const polyline = new window.BMap.Polyline(points, {
      strokeColor: 'red', strokeWeight: 6, strokeOpacity: 0.5
    })
    map.addOverlay(polyline)
    this.map.centerAndZoom(endPoint, 11)
  }

  // 绘制车辆点
  drawBikePoint(result) {
    const map = this.map
    const list = result.bike_list
    const icon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(10, 25)
    })
    list.forEach(item => {
      const gps = item.split(',')
      const point = new window.BMap.Point(gps[0], gps[1])
      const marker = new window.BMap.Marker(point, {icon})
      map.addOverlay(marker)
    })
  }

  // 绘制区域图
  drawServiceArea(result) {
    const map = this.map
    const list = result.service_list
    const points = []
    list.forEach(it => {
      points.push(new window.BMap.Point(it.lon, it.lat))
    })
    const polygon = new window.BMap.Polygon(points, {
      strokeColor: 'red',
      strokeWeight: 3,
    })
    map.addOverlay(polygon)
  }

  render () {
    return (
      <div>
        <Card>
          <BaseForm formList={formList} filterSubmit={this.handleFilterSubmit}/>
        </Card>

        <Card>
          <div>共{this.state.total_count}辆</div>
          <div id="container" style={{height: 500}}></div>
        </Card>
      </div>
    )
  }
}