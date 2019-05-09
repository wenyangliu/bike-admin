import React from 'react'
import {Card, Button, Table, Modal, message} from 'antd'
import utils from '../../utils'
import axios from '../../axios'
import CityForm from './form'
import BaseForm from '../../components/BaseForm'
import {formList} from './filterList'
import {columns} from './cloumns'

export default class City extends React.Component {
  state = {list: [], isShowOpenCity: false}
  params = {page: 1}
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }
  handleFilter = (params) => {
    this.params = {...params, ...this.params}
    this.requestList()
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
        params: this.params
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
    return (
      <div>
        <Card>
          <BaseForm formList={formList} filterSubmit={this.handleFilter}/>
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