import React from 'react'
import { Form, Select, Input } from 'antd'
const FormItem = Form.Item
const {Option} = Select

class EidtPerForm extends React.Component{

  render(){
    const { getFieldDecorator } = this.props.form;
    const detail = this.props.roleInfo
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
          <Input disabled type="text" placeholder={detail.role_name}/>
        </FormItem>

        <FormItem label="状态">
          {
            getFieldDecorator('status', {
              initialValue: detail.status
            }) (
              <Select>
                <Option value={1}>启用</Option>
                <Option value={0}>停用</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    );
  }
}
export default Form.create({})(EidtPerForm)