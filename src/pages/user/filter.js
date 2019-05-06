import React from 'react'
import { Form, Select, Button, Input } from 'antd'
const FormItem = Form.Item

class FilterForm extends React.Component{
  handleReset = () => {
    this.props.form.resetFields()
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem>
          {
            getFieldDecorator('user_name')(
              <Input placeholder="请输入用户名"/>
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('password')(
              <Input type="password" placeholder="请输入密码"/>
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" style={{margin:'0 20px'}}>登录</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);
export default FilterForm