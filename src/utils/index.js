import moment from 'moment'
import React from 'react'
import { Select } from 'antd'
const { Option } = Select

// 时间转换
function formateDate() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

// 分页
function pagination(data, callback) {
  return {
    onChange: (current) => {
      callback(current)
    },
    current: data.result.page,
    pageSize: data.result.pageSize,
    total: data.result.total,
    showTotal: () => {
      return `共${data.result.total}条`
    },
    showQuickJumper: true
  }
}

// 下拉框
function getOptionList(list) {
  if (!list) return
  let options = []
  list.map(it => {
    options.push(<Option value={it.id} key={it.id}>{it.name}</Option>)
  })
  return options
}

export default {
  formateDate,
  pagination,
  getOptionList
}