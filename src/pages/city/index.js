import React from 'react'
import {Card, Button, Table, Modal, message} from 'antd'
import CardFilter from './filter'
import utils from '../../utils'
import axios from '../../axios'
import CityForm from './form'


export default class City extends React.Component {
  state = {list: [], isShowOpenCity: false}
  params = {page: 1}
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }
  handleSubmit = () => {
    const cityInfo = this.formRef.props.form.getFieldsValue()
    console.log(cityInfo)
    axios.ajax({
      url:'/city/open',
      method: 'POST',
      data:{
        params:cityInfo
      }
    }).then((res)=>{
      if(res.code === 0) {
        message.success('开通成功');
        this.setState({
          isShowOpenCity:false
        })
        this.requestList();
      }
    })
  }
  hideModal = () => {
    this.setState({
      isShowOpenCity: false
    })
  }
  componentWillMount() {
    this.requestList()
  }

  requestList = () => {
    let _this = this
    axios.ajax({
      url: '/open_city',
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
        title: '城市ID',
        dataIndex: 'id'
      }, {
        title: '城市名称',
        dataIndex: 'name'
      }, {
        title: '用车模式',
        dataIndex: 'mode',
        render: (mode) => mode === 1 ? '停车点' : '禁停区'
      },
      {
        title: '营运模式',
        dataIndex: 'op_mode',
        render: (op_mode) => op_mode === 1 ? '自营' : '加盟'
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      }, {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render: (arr) => {
          return arr.map((item) => {
            return item.user_name;
          }).join(',')
        }
      }, {
        title: '城市开通时间',
        dataIndex: 'open_time'
      }, {
        title: '操作时间',
        dataIndex: 'update_time',
        render: utils.formateDate
      }, {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ]
    return (
      <div>
        <Card>
          <CardFilter/>
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>

        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <CityForm wrappedComponentRef={(inst) => this.formRef = inst} />
        </Modal>
      </div>
    )
  }
}