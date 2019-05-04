import moment from 'moment'

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

export default {
  formateDate,
  pagination
}