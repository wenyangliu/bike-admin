import React from 'react'
import {Card, Button, Table, Modal, Tree} from 'antd'
import axios from '../../axios'
import utils from '../../utils'
import RoleForm from './form'
import EditPerForm from './editPerForm'
import RoleAuthForm from './roleAuthForm'
import menus from '../../config/menuConfig'
const {TreeNode} = Tree

export default class Permission extends React.Component {
  state = {visible: false, isPermVisible: false, isAuthVisible: false}
  params = {}
  onRowClick = (record, index) => {
    this.setState({
      selectedRowKeys: [index],
      selectedItem: record
    })
  }
  componentDidMount() {
    this.requestList()
  }
  requestList = () => {
    axios.ajax({
      url: '/role/list',
      data: {params: this.params}
    }).then(res => {
      this.setState({
        list: res.result.list
      })
    })
  }

  // 创建角色
  handleCreateRole = () => {
    this.setState({
      visible: true
    })
  }

  // 设置权限
  handleSetRole = () => {
    const item = this.state.selectedItem
    if (!item) {
      Modal.warn({
        title: '提示',
        content: '请选择一条数据'
      })
      return
    }
    this.setState({
      isPermVisible: true,
      detailInfo: item,
      menuInfo: item.menus
    })
  }

  // 提交设置权限
  handlePermEditSubmit = ()=>{
    let data = this.roleForm.props.form.getFieldsValue();
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;
    console.log('权限设置提交数据', data)
    axios.ajax({
      url:'/permission/edit',
      method: 'patch',
      data:{
        params:{
          ...data
        }
      }
    }).then((res)=>{
      if(res){
        this.setState({
          isPermVisible:false
        })
        this.requestList();
      }
    })
  }

  // 用户授权
  handleAuthorize = () => {
    const item = this.state.selectedItem
    if (!item) {
      Modal.warn({
        title: '提示',
        content: '请选择一条数据'
      })
      return
    }
    this.setState({
      isAuthVisible: true,
      detailInfo: item
    })
    this.requestRoleUserList(item.id)
  }

  // 用户授权获取用户
  requestRoleUserList(id) {
    axios.ajax({
      url: '/role/user_list',
      data: {params: {id}}
    }).then(res => {
      const dataSource = res.result
      const targetKeys = [], mockData = []
      for (let i = 0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        }
        if (data.status === 1) {
          targetKeys.push(data.key)
        }
        mockData.push(data)
      }

      this.setState({
        targetKeys,
        mockData
      })
    })
  }
  // 用户授权提交
  handleUserSubmit = () => {
    let data ={}
    data.user_ids = this.state.targetKeys
    data.role_id = this.state.selectedItem.id
    axios.ajax({
      url: '/role/user_role_edit',
      method: 'post',
      data: {params: {...data}}
    }).then(res => {
      this.setState({
        isAuthVisible: false
      })
      this.requestList()
    })
  }

  handleAddRole = () => {
    const roleInfo = this.roleForm.props.form.getFieldsValue()
    console.log('roleInfo', roleInfo)
    this.setState({
      visible: false
    })
  }

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      )
    }
    return <TreeNode {...item} />
  })

  // 设置选中的节点，通过父组件方法再传递回来
  onCheck = (checkedKeys) => {
    this.roleForm.props.patchMenuInfo(checkedKeys);
  }
  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        dataIndex: 'role_name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (time) => utils.formateDate(time)
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render: (status) => status === 1 ? '启用' : '停用'
      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: (time) => utils.formateDate(time)
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name'
      },
    ]
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }
    // const menuInfo = this.props.menuInfo
    const menuInfo = this.state.menuInfo
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleCreateRole} style={{marginRight: 20}}>创建角色</Button>
          <Button type="primary" onClick={this.handleSetRole} style={{marginRight: 20}}>设置权限</Button>
          <Button type="primary" onClick={this.handleAuthorize}>用户授权</Button>
        </Card>

        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: (event) => {
                  this.onRowClick(record, index)
                }
              };
            }}
          />
        </div>

        <Modal
          title="创建角色"
          visible={this.state.visible}
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
          onOk={this.handleAddRole}
        >
          <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst} />
        </Modal>

        {/*设置权限*/}
        <Modal
          title="权限设置"
          visible={this.state.isPermVisible}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            })
          }}
          onOk={this.handlePermEditSubmit}
        >
          <EditPerForm
            roleInfo={this.state.selectedItem}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={(checkedKeys)=>{
              this.setState({
                menuInfo: checkedKeys
              });
            }}
            wrappedComponentRef={(inst) => this.roleForm = inst }
          />

          <Tree
            checkable
            defaultExpandAll={true}
            checkedKeys={menuInfo}
            onCheck={(checkedKeys)=>this.onCheck(checkedKeys)}
          >
            <TreeNode title="平台权限" key="platform_all">
              {this.renderTreeNodes(menus)}
            </TreeNode>
          </Tree>
        </Modal>

        {/*用户授权*/}
        <Modal
          title="用户授权"
          width={800}
          visible={this.state.isAuthVisible}
          onCancel={() => {
            this.setState({
              isAuthVisible: false
            })
          }}
          onOk={this.handleUserSubmit}
        >
          <RoleAuthForm
            roleInfo={this.state.selectedItem}
            mockData={this.state.mockData}
            targetKeys={this.state.targetKeys}
            patchUserInfo={(targetKeys) => {
              this.setState({
                targetKeys
              })
            }}
            wrappedComponentRef={(inst) => this.userAuthForm = inst }
          />
        </Modal>
      </div>
    )
  }
}