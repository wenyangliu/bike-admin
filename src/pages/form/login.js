import React from 'react'
import { Card, Form, Input, Button, Icon, Checkbox, message } from 'antd'
import '../ui/index.less'
import './index.less'
const FormItem = Form.Item

class FormLogin extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('values',values)
        const {username, password} = values
        message.success(`恭喜${username}, 登录成功！密码${password}`)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="登录行内表单" className="card">
          <Form layout="inline">
            <Form layout="inline">
              <FormItem>
                <Input placeholder="请输入用户名"/>
              </FormItem>
              <FormItem>
                <Input placeholder="请输入密码" />
              </FormItem>
              <FormItem>
                <Button type="primary">登录</Button>
              </FormItem>
            </Form>
          </Form>
        </Card>

        <Card title="登录水平表单">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form layout="inline">
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{required: true, message: '用户名必填'}],
                })(
                  <Input prefix={<Icon type="user"/>} placeholder="用户名" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{required: true, message: '密码必填'}]
                })(
                  <Input type="password" prefix={<Icon type="lock"/>}  placeholder="密码" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>记住密码</Checkbox>
                )}
                <a className="login-form-forgot" href="">忘记密码</a>

                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </FormItem>
            </Form>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormLogin)