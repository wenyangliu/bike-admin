import React from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import '../ui/index.less'
import dataMock from './table.mock'
import axios from '../../axios'
import utils from '../../utils'

export default class TableBasic extends React.Component {
  state = {}
  params = {
    page: 1
  }
  componentWillMount() {
    this.request()
  }
  request = ()=> {
    let _this = this
    axios.ajax({
      url: '/table/list1',
      data: {
        params: {page: this.params.page}
      }
    }).then(res => {
      console.log('res', res)
      this.setState({
        data2: res.result.list,
        selectedRowKeys: [],
        selectedRows: null,
        pagination: utils.pagination(res, (current) => {
          _this.params.page = current
          this.request()
        })
      })
    })
  }

  onRowClick = (record, index) => {
    let selectKey = [index]
    Modal.info({
      title: '信息',
      content: `用户名: ${record.username}, 爱好: ${record.hobby}`
    })
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  handleDelete = () => {
    let rows = this.state.selectedRows
    let ids = rows.map(item => item.id)
    Modal.confirm({
      title: '删除提示',
      content: `确定删除？ ${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功')
      }
    })
  }
  render() {
    const columns = [
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
        title: '状态',
        key: 'state',
        dataIndex: 'state',
      },
      {
        title: '爱好',
        key: 'hobby',
        dataIndex: 'hobby',
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
    const data = dataMock.data1
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }
    const rowCheckSelection =  {
      type: 'checkbox',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        let selectedIds = selectedRows.map(item => item.id)
        this.setState({
          selectedRowKeys,
          selectedRows,
          selectedIds
        })
      }
    }
    return (
      <div>
        <Card title="基础表格" className="card">
          <Table pagination={false} bordered={true} columns={columns} dataSource={data}/>
        </Card>

        <Card title="动态数据渲染表格-Mock" className="card">
          <Table pagination={false} bordered={true} columns={columns} dataSource={this.state.data2}/>
        </Card>

        <Card title="Mock-单选" className="card">
          <Table
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: (event) => {
                  this.onRowClick(record, index)
                }
              };
            }}
            pagination={false}
            bordered={true}
            columns={columns}
            dataSource={this.state.data2}/>
        </Card>

        <Card title="Mock-多选" className="card">
          <div style={{marginBottom: 10}}>
            <Button type="danger" onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            rowSelection={rowCheckSelection}
            pagination={false}
            bordered={true}
            columns={columns}
            dataSource={this.state.data2}/>
        </Card>

        <Card title="Mock-分页" className="card">
          <Table
            bordered={true}
            columns={columns}
            dataSource={this.state.data2}
            pagination={this.state.pagination}
          />
        </Card>

      </div>
    )
  }
}
