import React from 'react'
import { Card, Table, Badge, Modal, message } from 'antd'
import '../ui/index.less'
import axios from '../../axios'
import utils from "../../utils"


export default class TableHigh extends React.Component {
  params = {
    page: 1
  }
  state = {sortOrder: 'ascend'}
  componentWillMount() {
    this.request()
  }
  request = ()=> {
    let _this = this
    axios.ajax({
      url: '/table/high/list',
      data: {
        params: {page: this.params.page}
      }
    }).then(res => {
      console.log('res', res)
      this.setState({
        data3: res.result.list,
        selectedRowKeys: [],
        selectedRows: null,
        pagination: utils.pagination(res, (current) => {
          _this.params.page = current
          this.request()
        })
      })
    })
  }
  handleChange = (pagination, filters, sorter)=> {
    this.setState({
      sortOrder: sorter.order
    })
  }
  handleDelete = (item) => {
    console.log('item', item)
    let id = item.id
    Modal.confirm({
      title: '确认',
      content: `确认删除？${id}`,
      onOk: () => {
        message.success('删除成功')
        this.request()
      }
    })
  }
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    }, {
      title: 'Age',
      dataIndex: 'age',
      width: 150,
    }, {
      title: 'Address',
      dataIndex: 'address',
    }]

    const columns3 = [
      {
        title: 'id',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        key: 'username',
        dataIndex: 'username',
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        render: sex => sex === 1 ? '男' : '女'
      },
      {
        title: '年龄',
        key: 'age',
        dataIndex: 'age',
        sorter: (a, b) => {
          return a.age - b.age
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
      },
      {
        title: '爱好',
        key: 'hobby',
        dataIndex: 'hobby'
      },
      {
        title: '生日',
        key: 'birthday',
        dataIndex: 'birthday',
      },
      {
        title: '联系地址',
        key: 'address',
        dataIndex: 'address',
      }
    ]

    const columns4 = [
      {
        title: 'id',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        key: 'username',
        dataIndex: 'username',
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        render: sex => sex === 1 ? '男' : '女'
      },
      {
        title: '年龄',
        key: 'age',
        dataIndex: 'age',
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
      },
      {
        title: '爱好',
        key: 'hobby',
        dataIndex: 'hobby',
        render(hobby) {
          let config = {
            1: <Badge status="success" text="成功" />,
            2: <Badge status="error" text="报错" />,
            3: <Badge status="default" text="正常" />,
            4: <Badge status="processing" text="运行中" />,
            5: <Badge status="warning" text="警告" />
          }
          return config[hobby]
        }
      },
      {
        title: '生日',
        key: 'birthday',
        dataIndex: 'birthday',
      },
      {
        title: '联系地址',
        key: 'address',
        dataIndex: 'address',
      },
      {
        title: '操作',
        render: (item) => {
          return <a size="small" onClick={() => {this.handleDelete(item)}}>删除</a>
        }
      }
    ]

    const data = []
    for (let i = 0; i < 25; i++) {
      data.push({
        key: i,
        name: `Name ${i}`,
        age: 23,
        address: `Address no.${i}`
      })
    }

    const columns2 = [{
      title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',
    },
      {
        title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left',
      },
      { title: 'Column 1', dataIndex: 'address', key: '1' },
      { title: 'Column 2', dataIndex: 'address', key: '2' },
      { title: 'Column 3', dataIndex: 'address', key: '3' },
      { title: 'Column 4', dataIndex: 'address', key: '4' },
      { title: 'Column 5', dataIndex: 'address', key: '5' },
      { title: 'Column 6', dataIndex: 'address', key: '6' },
      { title: 'Column 7', dataIndex: 'address', key: '7' },
      { title: 'Column 8', dataIndex: 'address', key: '8' },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a href="javascript:;">action</a>,
      },]
    const data2 = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    }]

    return (
      <div>
        <Card title="头部固定" className="card">
          <Table pagination={{pageSize: 10}} scroll={{y: 260}} bordered={true} columns={columns} dataSource={data}/>
        </Card>

        <Card title="列固定" className="card">
          <Table scroll={{x: 1300}} bordered={true} columns={columns2} dataSource={data2}/>
        </Card>

        <Card title="排序" className="card">
          <Table
            bordered={true}
            columns={columns3}
            dataSource={this.state.data3}
            pagination={this.state.pagination}
            onChange={this.handleChange}
          />
        </Card>

        <Card title="操作按钮" className="card">
          <Table
            bordered={true}
            columns={columns4}
            dataSource={this.state.data3}
            pagination={this.state.pagination}
          />
        </Card>



      </div>
    )
  }
}
