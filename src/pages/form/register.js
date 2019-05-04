import React from 'react'
import { Card, Form, Input, InputNumber, Icon, Upload, DatePicker, Button, TimePicker, Checkbox, Radio, Switch, Select, message } from 'antd'
import moment from 'moment'
import './index.less'
const FormItem = Form.Item
const {Option} = Select
const TextArea = Input.TextArea

class FormRegister extends React.Component {
  state = {
    loading: false
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('values',values)
        const {username, password} = values
        message.success(`恭喜${username}, 注册成功！密码${password}`)
      }
    })
  }
  getBase64 = (img, callback)=> {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img)
  }
  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
  handleChange = (info)=> {
    if (info.file.status === 'uploading') {
      this.setState({
        loading: true
      })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12}
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    }
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl
    return (
      <div>
        <Card title="注册表单">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <FormItem label="用户名">
              {getFieldDecorator('username', {
                rules: [{
                  required: true, message: '用户名必填！',
                }]
              })(
                <Input/>
              )}
            </FormItem>

            <FormItem label="密码">
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '密码必填！',
                }]
              })(
                <Input type="password"/>
              )}
            </FormItem>

            <FormItem label="性别">
              {getFieldDecorator('sex', {
                initialValue: '1'
              })(
                <Radio.Group>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label="年龄">
              {getFieldDecorator('age', {
                initialValue: 18
              })(
                <InputNumber />
              )}
            </FormItem>

            <FormItem label="当前状态">
              {getFieldDecorator('state', {
                initialValue: '2'
              })(
                <Select>
                  <Option value="1">咸鱼一条</Option>
                  <Option value="2">风华浪子</Option>
                  <Option value="3">北大才子</Option>
                  <Option value="4">百度FE</Option>
                  <Option value="5">创业者</Option>
                </Select>
              )}
            </FormItem>

            <FormItem label="爱好">
              {getFieldDecorator('hobby', {
                initialValue: ['2', '6', '7']
              })(
                <Select mode="multiple">
                  <Option value="1">游泳</Option>
                  <Option value="2">打篮球</Option>
                  <Option value="3">踢足球</Option>
                  <Option value="4">跑步</Option>
                  <Option value="5">爬山</Option>
                  <Option value="6">桌球</Option>
                  <Option value="7">麦霸</Option>
                </Select>
              )}
            </FormItem>

            <FormItem label="是否已婚">
              {getFieldDecorator('isMarried', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Switch/>
              )}
            </FormItem>

            <FormItem label="生日">
              {getFieldDecorator('birthday', {
                initialValue: moment('2018-08-08')
              })(
                <DatePicker/>
              )}
            </FormItem>

            <FormItem label="联系地址">
              {getFieldDecorator('address', {
                initialValue: '联系地址'
              })(
                <TextArea
                  autosize={{minRows: 4}}
                />
              )}
            </FormItem>

            <FormItem label="早起时间">
              {getFieldDecorator('time')(
                <TimePicker/>
              )}
            </FormItem>

            <FormItem label="头像">
              {getFieldDecorator('upload')(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={imageUrl} /> : uploadButton}
                </Upload>
              )}
            </FormItem>


            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>我已阅读过<a href="">协议</a></Checkbox>
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">注册</Button>
            </FormItem>
          </Form>

        </Card>
      </div>
    )
  }
}

export default Form.create()(FormRegister)