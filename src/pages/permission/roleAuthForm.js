import React from 'react'
import { Form, Input, Transfer } from 'antd'
const FormItem = Form.Item

class RoleAuthForm extends React.Component{
  filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1
  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys)
  }
  render(){
    const detail = this.props.roleInfo
    const formItemLayout = {
      labelCol:{
        span: 5
      },
      wrapperCol:{
        span: 18
      }
    }
    return (
      <Form layout="horizontal" {...formItemLayout}>
        <FormItem label="角色名称">
          <Input disabled type="text" placeholder={detail.role_name}/>
        </FormItem>
        <FormItem label="选择用户">
          <Transfer
            listStyle={{width: 200, height: 400}}
            dataSource={this.props.mockData}
            showSearch
            searchPlaceholder="请输入用户名"
            titles={['待选用户', '已选用户']}
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
          />
        </FormItem>

      </Form>
    );
  }
}
export default Form.create({})(RoleAuthForm)