import React, { Component } from 'react';
import {Card,Button,Table,Modal,message} from 'antd';
import dayjs from 'dayjs'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../utils/memoryUtils'
import {reqRoleList,reqAddRole,reqUpdateRole} from '../../api'
import storage from '../../utils/storage'

const authFormRef = React.createRef();
class Role extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading:false,//表格加载状态
      role:{},//选中的role
      isShowAdd:false,
      isShowAuth:false,
      roles:[]
    }
    this.columns=[];//定义列格式
    this.initColums();
  }
  initColums=()=>{
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render:(time)=>{
          return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render:(time)=>{
          return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
    ];
  }

  getRoleList=async()=>{
    this.setState({loading:true})
    const res = await reqRoleList();
    this.setState({loading:false})
    if(res.status === 0){
      const roles = res.data;
      this.setState({roles})
    }
  }
  onRow = (row)=>{
    return {
      onClick:event=>{
        this.setState({role:row});
      }
    }
  } 

  getAddFormData=(data)=>this.roleName = data.name;

  handleAddRole=async ()=>{
    let {roleName} = this;
    if(roleName && /\S+/.test(roleName)){
      roleName = roleName.trim();
      const res = await reqAddRole(roleName);
      this.setState({isShowAdd:false});
      if(res.status === 0){
        message.success("添加角色成功");
        this.getRoleList();
      }else{
        message.error("添加角色失败")
      }
    }else{
      message.warn("请输入角色名称")
    }
  }

  handleUpdateRole= async ()=>{
    const role = this.state.role;
    const menus = authFormRef.current.getMenus();
    role.menus = menus;
    role.auth_time = Date.now();
    role.auth_name=memoryUtils.user.username;
    const res = await reqUpdateRole(role);
    this.setState({isShowAuth:false})
    if(res.status === 0){
      if(role._id === memoryUtils.user.role_id){
        message.success("当前用户权限已更新，请重新登录")
        memoryUtils.user = {};
        storage.removeUser();
        this.props.history.replace("/login");
      }else{
        message.success("更新角色权限成功")
        this.getRoleList();
      }
    }else{
      message.error("更新角色权限失败")
    }
  }

  componentDidMount() {
    this.getRoleList();
  }
  render() { 
    const {loading, roles,role,isShowAdd,isShowAuth} = this.state;
    const title= (
      <>
        <Button type="primary" style={{marginRight:10}} onClick = {()=>this.setState({isShowAdd:true})}>创建角色</Button>
        <Button type="primary" disabled={!role._id} onClick={()=>this.setState({isShowAuth:true})}>设置角色权限</Button>
      </>
    )
    return (
      <Card title={title}>
        <Table 
          onRow={this.onRow}
          bordered={true} 
          rowKey="_id"
          loading={loading}
          dataSource={roles} 
          pagination={{defaultPageSize:5,showQuickJumper:true}}
          columns={this.columns} 
          rowSelection={{
            type:"radio",
            selectedRowKeys:[role._id],
            onSelect:role=>{
              this.setState({role})
            }
          }}
          
        />;
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.handleAddRole}
          onCancel={()=>this.setState({isShowAdd:false})}
        >
          <AddForm  getFormData={(data)=>this.getAddFormData(data)} roleName="" />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.handleUpdateRole}
          onCancel={()=>this.setState({isShowAuth:false})}
        >
          <AuthForm ref={authFormRef} role={role}/>
        </Modal>
      </Card>
    );
  }
}
 
export default Role;