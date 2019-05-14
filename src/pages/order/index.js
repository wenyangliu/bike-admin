import React from 'react'
import {Card, Button, Table, Modal, Form, message} from 'antd'
import BaseForm from '../../components/BaseForm/index'
import axios from '../../axios'
import {formList} from './filterList'
import {columns} from "./columns"
const FormItem = Form.Item

export default class Order extends React.Component {
  state = {
    list: [],
    isShowOpenCity: false,
    orderInfo: {},
    orderConfirmVisible: false
  }
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

  handleFilter = (params) => {
    this.params = {...params, ...this.params}
    this.requestList()
  }
  closeOrder = () => {
    const item = this.state.selectedItem
    if (!item) {
      Modal.warn({
        title: '提示',
        content: '请选择一条进行中的订单'
      })
    } else {
      if (item.status !== 1) {
        Modal.warn({
          title: '提示',
          content: '该订单行程已结束'
        })
        return
      }

      axios.ajax({
        url: '/order/ebike_info',
        data: {params: {orderId: item.id}}
      }).then(res => {
        this.setState({
          orderInfo: res.result,
          orderConfirmVisible: true
        })
      })
    }
  }

  // 确定关闭订单
  handleFinishOrder = () => {
    const item = this.state.selectedItem
    axios.ajax({
      url: '/order/finish_order',
      method: 'POST',
      data: {params: {orderId: item.id}}
    }).then(res => {
      message.success('订单结束成功')
      this.setState({
        orderConfirmVisible: false
      })
      this.requestList()
    })
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
    axios.requestList(this, '/order/list')
  }

  render() {
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }
    return (
      <div>
        <Card>
          <BaseForm formList={formList} filterSubmit={this.handleFilter} />
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

        {/*结束订单*/}
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisible}
          onCancel={() => {
            this.setState({
              orderConfirmVisible: false
            })
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout="horizontal" {...formItemLayout}>
            <FormItem label="车辆编号">
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量">
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem label="行程开始时间">
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置">
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>

      </div>
    )
  }
}