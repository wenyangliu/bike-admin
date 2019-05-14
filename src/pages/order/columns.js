import utils from "../../utils"
export const columns = [
  {
    title: '订单编号',
    dataIndex: 'order_sn'
  }, {
    title: '车辆编号',
    dataIndex: 'bike_sn'
  }, {
    title: '用户名',
    dataIndex: 'user_name'
  },
  {
    title: '手机号码',
    dataIndex: 'mobile'
  },
  {
    title: '里程',
    dataIndex: 'distance'
  }, {
    title: '行程时长',
    dataIndex: 'total_time'
  }, {
    title: '状态',
    dataIndex: 'status',
    render: (status) => {
      let config = {
        1: '进行中',
        2: '行程结束'
      }
      return config[status]
    }
  }, {
    title: '开始时间',
    dataIndex: 'start_time',
    render: utils.formateDate
  },
  {
    title: '结束时间',
    dataIndex: 'end_time',
    render: utils.formateDate
  },
  {
    title: '订单金额',
    dataIndex: 'total_fee'
  },
  {
    title: '实付金额',
    dataIndex: 'user_pay'
  }
]