import React from 'react'
import { Form, Select, Button, DatePicker } from 'antd'
const FormItem = Form.Item
const {Option} = Select

class FilterForm extends React.Component{
  handleReset = () => {
    this.props.form.resetFields()
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {
            getFieldDecorator('city_id')(
              <Select
                style={{width:100}}
                placeholder="全部"
              >
                <Option value="">全部</Option>
                <Option value="1">北京市</Option>
                <Option value="2">天津市</Option>
                <Option value="3">深圳市</Option>
                <Option value="3">杭州市</Option>
              </Select>
            )
          }
          {
            getFieldDecorator('start_time')(
              <DatePicker
                placeholder="选择开始时间"
                showTime
              />
            )
          }
          ~
          {
            getFieldDecorator('end_time')(
              <DatePicker
                style={{width: 100}}
                placeholder="选择结束时间"
                showTime
              />
            )
          }
        </FormItem>
        <FormItem label="订单状态">
          {
            getFieldDecorator('status')(
              <Select
                style={{ width: 160 }}
                placeholder="全部"
              >
                <Option value="">全部</Option>
                <Option value="1">进行中</Option>
                <Option value="2">进行中（临时锁车）</Option>
                <Option value="3">行程结束</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
          <Button onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);
export default FilterForm