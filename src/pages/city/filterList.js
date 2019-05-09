export const formList = [
  {
    type: 'SELECT',
    label: '城市',
    field: 'city',
    width: 100,
    initialValue: '0',
    placeholder: '全部',
    list: [
      {id: '0', name: '全部'},
      {id: '1', name: '北京市'},
      {id: '2', name: '上海市'}
    ]
  },
  {
    type: 'SELECT',
    label: '用车模式',
    field: 'mode',
    width: 120,
    initialValue: '0',
    placeholder: '全部',
    list: [
      {id: '0', name: '全部'},
      {id: '1', name: '指定停车点模式'},
      {id: '2', name: '禁停区模式'}
    ]
  },
  {
    type: 'SELECT',
    label: '营运模式',
    field: 'op_mode',
    width: 80,
    initialValue: '0',
    placeholder: '全部',
    list: [
      {id: '0', name: '全部'},
      {id: '1', name: '自营'},
      {id: '2', name: '加盟'}
    ]
  },
  {
    type: 'SELECT',
    label: '加盟商授权状态',
    field: 'auth_status',
    width: 100,
    initialValue: '0',
    placeholder: '全部',
    list: [
      {id: '0', name: '全部'},
      {id: '1', name: '已授权'},
      {id: '2', name: '未授权'}
    ]
  }
]