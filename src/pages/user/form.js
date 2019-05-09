import React from 'react'
import { Form, Select, Radio, Input, DatePicker } from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const {Option} = Select
const RadioGroup = Radio.Group

class UserForm extends React.Component{

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol:{
        span: 5
      },
      wrapperCol:{
        span: 16
      }
    }
    const userInfo = this.props.userInfo || {}
    const type = this.props.type
    return (
      <Form layout="horizontal" {...formItemLayout}>
        <FormItem label="姓名">
          {
            userInfo && type === 'detail' ? userInfo.name :
            getFieldDecorator('name', {
              initialValue: userInfo.name
            }) (
              <Input type="text" placeholder="请输入姓名"/>
            )
          }
        </FormItem>
        <FormItem label="性别">
          {
            userInfo && type === 'detail' ? userInfo.sex :
            getFieldDecorator('sex', {
              initialValue: userInfo.sex
            }) (
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label="状态">
          {
            userInfo && type === 'detail' ? userInfo.status :
            getFieldDecorator('status', {
              initialValue: userInfo.status
            }) (
              <Select>
                <Option value={1}>咸鱼一条</Option>
                <Option value={2}>风华浪子</Option>
                <Option value={3}>北大才子一枚</Option>
                <Option value={4}>百度FE</Option>
                <Option value={5}>创业者</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="生日">
          {
            userInfo && type === 'detail' ? userInfo.birthday :
            getFieldDecorator('birthday', {
              initialValue: moment(userInfo.birthday)
            }) (
              <DatePicker />
            )
          }
        </FormItem>
        <FormItem label="联系地址">
          {
            userInfo && type === 'detail' ? userInfo.address :
            getFieldDecorator('address', {
              initialValue: userInfo.address
            }) (
              <Input.TextArea rows={3} placeholder="请输入联系地址" />
            )
          }
        </FormItem>
      </Form>
    );
  }
}
export default Form.create({})(UserForm)