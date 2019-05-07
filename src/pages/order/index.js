import React from 'react'
import {Card, Button, Table, Modal} from 'antd'
import CardFilter from './filter'
import utils from '../../utils'
import axios from '../../axios'

export default class Order extends React.Component {
  state = {list: [], isShowOpenCity: false}
  params = {page: 1}
  getOrderDetail = () => {
    const item = this.state.selectedItem
    if (!item) {
      Modal.warn({
        title: '提示',
        content: '请选择一条订单'
      })
    } else {
      window.open(`/#/common/order/detail/${item.id}`, '_blank')
    }
  }
  closeOrder = () => {

  }
  onRowClick = (record, index) => {
    console.log(record, index)
    this.setState({
      selectedRowKeys: [index],
      selectedItem: record
    })
  }
  componentWillMount() {
    this.requestList()
  }

  requestList = () => {
    let _this = this
    axios.ajax({
      url: '/order/list',
      data: {
        params: this.params.page
      }
    }).then(res => {
      let list = res.result.list.map((item, index) => {
        item.key = index
        return item
      })
      this.setState({
        list,
        pagination: utils.pagination(res, (current) => {
          _this.params.page = current
          _this.requestList()
        })
      })
    })
  }

  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      }, {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      }, {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号码',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance'
      }, {
        title: '行程时长',
        dataIndex: 'total_time'
      }, {
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          let config = {
            1: '进行中',
            2: '进行中(临时锁车)',
            3: '行程结束'
          }
          return config[status]
        }
      }, {
        title: '开始时间',
        dataIndex: 'start_time',
        render: utils.formateDate
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
        render: utils.formateDate
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ]
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }
    return (
      <div>
        <Card>
          <CardFilter/>
        </Card>
        <Card style={{marginTop: 10}}>
          <Button style={{marginRight: 10}} type="primary" onClick={this.getOrderDetail}>订单详情</Button>
          <Button type="primary" onClick={this.closeOrder}>结束订单</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: (event) => {
                  this.onRowClick(record, index)
                }
              };
            }}
          />
        </div>
      </div>
    )
  }
}