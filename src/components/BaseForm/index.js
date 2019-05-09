import React from 'react'
import { Form, Select, Button, DatePicker, Input, Checkbox } from 'antd'
import utils from '../../utils'
const FormItem = Form.Item

class FilterForm extends React.Component{
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue()
    this.props.filterSubmit(fieldsValue)
  }
  handleReset = () => {
    this.props.form.resetFields()
  }

  initFormList = () => {
    const { getFieldDecorator } = this.props.form
    const formList = this.props.formList
    const formItemList = []
    if (formList && formList.length > 0) {
      formList.forEach((item, i) => {
        let {type, label, field, placeholder, width, initialValue, list} = item
        if (type === '时间查询') {
          const begin_time = <FormItem label="订单时间" key={field}>
            {
              getFieldDecorator('begin_time') (
                <DatePicker style={{width}} showTime placeholder="开始时间" />
              )
            }
          </FormItem>
          formItemList.push(begin_time)
          const end_time = <FormItem label="~" colon={false} key={field}>
            {
              getFieldDecorator('end_time') (
                <DatePicker style={{width}} showTime placeholder="结束时间" />
              )
            }
          </FormItem>
          formItemList.push(end_time)
        } else if (type === 'INPUT') {
          const INPUT = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                initialValue
              })(
                <Input type="text" placeholder={placeholder}/>
              )
            }
          </FormItem>
          formItemList.push(INPUT)
        } else if (type === 'SELECT') {
          const SELECT = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                initialValue
              })(
                <Select style={{width}} placeholder={placeholder}>
                  {utils.getOptionList(list)}
                </Select>
              )
            }
          </FormItem>
          formItemList.push(SELECT)
        } else if (type === 'CHECKBOX') {
          const CHECKBOX = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                valuePropName: 'checked',
                initialValue
              })(
                <Checkbox>
                  {label}
                </Checkbox>
              )
            }
          </FormItem>
          formItemList.push(CHECKBOX)
        }
      })
    }
    return formItemList
  }

  render(){
    return (
      <Form layout="inline">
        { this.initFormList() }
        <FormItem>
          <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
          <Button onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);
export default FilterForm