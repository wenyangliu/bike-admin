import React from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import echartTheme from '../echartTheme'
import echarts from 'echarts/lib/echarts'

// 引入饼图和折线图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

export default class Bar extends React.Component {
  state = {}

  componentWillMount() {
    echarts.registerTheme('Bike', echartTheme)
  }
  getOption() {
    return {
      title: {text: '用户骑行订单'},
      tooltip: {trigger: 'axis'},
      xAxis: {
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {type: 'value'},
      series: [
        {name: '订单量', type: 'bar', data: [1000, 2000, 1500, 3000, 2000, 1200, 800]}
      ]
    }
  }

  getOption2() {
    return {
      title: {text: '用户骑行订单'},
      tooltip: {trigger: 'axis'},
      legend: {data: ['OFO', '摩拜', 'Hello Bike']},
      xAxis: {
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {type: 'value'},
      series: [
        {name: 'OFO', type: 'bar', data: [1000, 2000, 1500, 3000, 2000, 1200, 800]},
        {name: '摩拜', type: 'bar', data: [2000, 3000, 2500, 4000, 3000, 2200, 1800]},
        {name: 'Hello Bike', type: 'bar', data: [3000, 4000, 3500, 5000, 4000, 3200, 2800]}
      ]
    }
  }

  render () {
    return (
      <div>
        <Card title="柱状图一">
          <ReactEcharts
            option={this.getOption()}
            theme="Bike"
            notMerge={true}
            lazyUpdate={true}
            style={{height: 500}}
          />
        </Card>

        <Card title="柱状图二">
          <ReactEcharts
            option={this.getOption2()}
            theme="Bike"
            notMerge={true}
            lazyUpdate={true}
            style={{height: 500}}
          />
        </Card>

      </div>
    )
  }
}