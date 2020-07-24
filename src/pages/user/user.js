import React, { Component } from 'react';
import {Card,Button,Table,Modal,message} from 'antd'
import LinkButton from '../../components/link-button';
import dayjs from 'dayjs'
import {reqDeleteUser,reqUsers,reqAddOrUpdateUser} from '../../api'
import UserForm  from './user-form'


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      loading:false,
      isShow:false,
      users:[],
      roles:[]
    }
    this.columns=[];//定义列格式
    this.initColums();
  }
  initColums=()=>{
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '联系方式',
        dataIndex: 'phone',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render:(time)=>{
          return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render:(rowId)=>{
          return this.roleNames[rowId];
        }

      },
      {
        title: '操作',
        render:(user)=>(
            <>
              <LinkButton onClick={()=>this.showupdate(user)}>修改</LinkButton>
              <LinkButton onClick={()=>this.deleteUser(user)}>删除</LinkButton>
            </>
          )
        
      },
    ];
  }

  handleAddOrUpdateUser=async ()=>{
    //1.收集表单数据
    if(this.user._id){
      this.form._id = this.user._id;
    }
    const res =await reqAddOrUpdateUser(this.form);
    this.setState({isShow:false})
    if(res.status === 0){
      message.success(`${this.user._id ? '更新':'添加'}用户成功`)
      this.getUserList();
    }else{
      message.error(`${this.user._id ? '更新':'添加'}用户失败`)
    }
  }
  //删除用户
  deleteUser=(user)=>{
    Modal.confirm({
      title:`确认删除${user.username}吗？`,
      onOk:async ()=>{
        const res = await reqDeleteUser(user._id);
        if(res.status === 0 ){
          message.success('删除用户成功');
          this.getUserList();
        }else{
          message.error('删除用户失败');
        }
      }
    })
  }
  //创建用户角色名称对象，用于map用户角色id对应的名称
  initRoleNames=(roles)=>{
    const roleNames = roles.reduce((pre,role)=>{
      pre[role._id] = role.name;
      return pre;
    },{})
    this.roleNames = roleNames;
  }
  //获取用户列表
  getUserList=async()=>{
    const res = await reqUsers();
    if(res.status === 0){
      message.success('获取用户列表成功')
      const {users, roles} = res.data;
      this.initRoleNames(roles);
      this.setState({users,roles})
    }else{
      message.error('获取用户列表失败')
    }
  }
  //显示修改界面
  showupdate =(user)=>{
    this.user = user;
    this.setState({
      isShow:true
    })
  }
  //显示添加界面
  showAddUser=()=>{
    this.user = {};
    this.setState({isShow:true})
  }
  componentDidMount() {
    this.getUserList();
  }

  render() { 
    const {users,loading,isShow,roles}= this.state;
    const user = this.user || {};

    const title = (<Button type="primary" onClick={this.showAddUser}>添加用户</Button>);

    return (
      <Card title={title}>
        <Table 
          bordered 
          rowKey="_id"
          loading={loading}
          dataSource={users} 
          pagination={{defaultPageSize:5,showQuickJumper:true}}
          columns={this.columns} 
        />;
        <Modal
          title={user._id?"更新用户":"添加用户"}
          visible={isShow}
          onOk={this.handleAddOrUpdateUser}
          onCancel={()=>this.setState({isShow:false})}
        >
            <UserForm getFormData={form=>{this.form = form;}} user={user} roles={roles}></UserForm>
        </Modal>
      </Card>
    );
  }
}
 
export default User;