export const formList = [
  {
    type: 'SELECT',
    label: '城市',
    field: 'city',
    placeholder: '全部',
    initialValue: '0',
    width: 100,
    list: [
      {id: '0', name: '全部'},
      {id: '1', name: '北京'},
      {id: '2', name: '上海'},
      {id: '3', name: '南京'}
    ]
  },
  {
    type: '时间查询',
    width: 100
  },
  {
    type: 'SELECT',
    label: '订单状态',
    field: 'status',
    placeholder: '全部',
    initialValue: '1',
    width: 160,
    list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '2', name: '结束行程'}]
  }
]