import React from 'react'
import { Form, Select, Input } from 'antd'
const FormItem = Form.Item
const {Option} = Select

class RoleForm extends React.Component{

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
    return (
      <Form layout="horizontal" {...formItemLayout}>
        <FormItem label="角色名称">
          {
            getFieldDecorator('role_name', {
              initialValue: ''
            }) (
              <Input type="text" placeholder="请输入角色名称"/>
            )
          }
        </FormItem>

        <FormItem label="状态">
          {
            getFieldDecorator('status', {
              initialValue: 1
            }) (
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>关闭</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    );
  }
}
export default Form.create({})(RoleForm)