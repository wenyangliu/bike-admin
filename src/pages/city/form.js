import React from 'react'
import { Form, Select, Radio } from 'antd'
const FormItem = Form.Item
const {Option} = Select

class CityForm extends React.Component{

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol:{
        span:5
      },
      wrapperCol:{
        span:19
      }
    }
    return (
      <Form layout="horizontal" {...formItemLayout}>
        <FormItem label="选择城市">
          {
            getFieldDecorator('city_id',{
              initialValue:'1'
            })(
              <Select style={{ width: 100 }}>
                <Option value="">全部</Option>
                <Option value="1">北京市</Option>
                <Option value="2">天津市</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem label="营运模式">
          {
            getFieldDecorator('op_mode',{
              initialValue:'1'
            })(
              <Radio.Group>
                <Radio value="1">自营</Radio>
                <Radio value="2">加盟</Radio>
              </Radio.Group>
            )
          }
        </FormItem>

        <FormItem label="用车模式">
          {
            getFieldDecorator('mode',{
              initialValue:'1'
            })(
              <Radio.Group>
                <Radio value="1">指定停车点模式</Radio>
                <Radio value="2">禁停区模式</Radio>
              </Radio.Group>
            )
          }
        </FormItem>

      </Form>
    );
  }
}
CityForm = Form.create({})(CityForm);
export default CityForm