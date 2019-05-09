import React from 'react'
import {Form, Input, Button} from 'antd'

const FormItem = Form.Item

class LoginForm extends React.Component {
  state = {};

  loginSubmit = (e) => {
    e && e.preventDefault();
    const _this = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formValue = _this.props.form.getFieldsValue();
        _this.props.loginSubmit({
          username: formValue.username,
          password: formValue.password
        });
      }
    });
  };

  checkUsername = (rule, value, callback) => {
    const reg = /^\w+$/;
    if (!value) {
      callback('请输入用户名!');
    } else if (!reg.test(value)) {
      callback('用户名只允许输入英文字母');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码!');
    } else {
      callback();
    }
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: 'admin',
            rules: [{validator: this.checkUsername}]
          })(
            <Input placeholder="用户名" onPressEnter={this.loginSubmit}/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            initialValue: 'admin',
            rules: [{validator: this.checkPassword}]
          })(
            <Input type="password" onPressEnter={this.loginSubmit} placeholder="密码" wrappedcomponentref={(inst) => this.pwd = inst}/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={this.loginSubmit} className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
    )
  }
}

LoginForm = Form.create({})(LoginForm)
export default LoginForm