import React from 'react'
import {Card, Button, Table, Modal} from 'antd'
import CardFilter from './filter'
import axios from '../../axios'
import UserForm from './form'
import {columns} from './columns'


export default class User extends React.Component {
  state = {list: [], visible: false}
  params = {page: 1}
  handleOperator = (type) => {
    const _this = this
    const item = this.state.selectedItem
    if (type === 'create') {
      this.setState({
        title: '创建员工',
        type,
        visible: true
      })
    } else if (['edit', 'detail'].includes(type)) {
      if (!item) {
        Modal.info({
          title: '信息',
          content: '请选择一个用户'
        })
        return
      }
      this.setState({
        title: type === 'edit' ? '编辑用户' : '查看详情',
        type,
        visible: true,
        userInfo: item
      })
    } else if (type === 'delete') {
      if (!item) {
        Modal.info({
          title: '信息',
          content: '请选择一个用户'
        })
        return
      }
      Modal.confirm({
        title: '提示',
        content: '确认要删除吗',
        onOk() {
          axios.ajax({
            url: '/user/delete',
            method: 'delete',
            data: {params: {id: item.id}}
          }).then(res => {
            _this.requestList()
          })
        }
      })
    }
  }

  handleSubmit = () => {
    const type = this.state.type
    const data = this.userForm.props.form.getFieldsValue()
    axios.ajax({
      url: type === 'create' ? '/user/add' : '/user/patch',
      method: type === 'create' ? 'post' : 'patch',
      data: {
        params: {...data}
      }
    }).then(res => {
      this.setState({
        visible: false,
        selectedRowKeys: [],
        selectedItem: ''
      })
      this.requestList()
      this.userForm.props.form.resetFields()
    })
  }

  onRowClick = (record, index) => {
    this.setState({
      selectedRowKeys: [index],
      selectedItem: record
    })
  }

  componentWillMount() {
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/user/list')
  }

  render() {
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
          <Button style={{marginRight: 10}} type="primary" onClick={() => this.handleOperator('create')}>创建员工</Button>
          <Button style={{marginRight: 10}} type="primary" onClick={() => this.handleOperator('edit')}>编辑员工</Button>
          <Button style={{marginRight: 10}} type="primary" onClick={() => this.handleOperator('detail')}>员工详情</Button>
          <Button type="danger" onClick={() => this.handleOperator('delete')}>删除员工</Button>
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


        <Modal
          title={this.state.title}
          visible={this.state.visible}
          width={800}
          onCancel={() => {
            this.userForm.props.form.resetFields()
            this.setState({
              visible: false,
              userInfo: {}
            })
          }}
          onOk={this.handleSubmit}
        >
          <UserForm userInfo={this.state.userInfo} type={this.state.type}
                    wrappedComponentRef={(inst) => this.userForm = inst}/>
        </Modal>
      </div>
    )
  }
}