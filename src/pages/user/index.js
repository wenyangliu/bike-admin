import React from 'react'
import {Card, Button, Table, Modal, message} from 'antd'
import CardFilter from './filter'
import utils from '../../utils'
import axios from '../../axios'
import CityForm from './form'


export default class User extends React.Component {
  state = {list: [], isShowOpenCity: false}
  params = {page: 1}
  createUser = () => {

  }
  editUser = () => {

  }
  getUser = () => {

  }
  deleteUser = () => {

  }
  onRowClick = (record, index) => {
    console.log(record, index)
    this.setState({
      selectedRowKeys: [index]
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
        title: 'id',
        dataIndex: 'order_sn'
      }, {
        title: '用户名',
        dataIndex: 'bike_sn'
      }, {
        title: '性别',
        dataIndex: 'user_name'
      },
      {
        title: '状态',
        dataIndex: 'mobile'
      },
      {
        title: '爱好',
        dataIndex: 'distance'
      }, {
        title: '生日',
        dataIndex: 'total_time'
      }, {
        title: '联系地址',
        dataIndex: 'status',
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
          <Button style={{marginRight: 10}} type="primary" onClick={this.createUser}>创建员工</Button>
          <Button style={{marginRight: 10}} type="primary" onClick={this.editUser}>编辑员工</Button>
          <Button style={{marginRight: 10}} type="primary" onClick={this.getUser}>员工详情</Button>
          <Button type="danger" onClick={this.deleteUser}>删除员工</Button>
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