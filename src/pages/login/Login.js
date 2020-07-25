import React, { Component } from 'react';
import { Form, Input, Button, Checkbox,message } from 'antd';
import {connect} from 'react-redux';
import{login} from '../../redux/actions'

import {Redirect} from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import logo from '../../assets/logo.png'
/* 
  登录的路由组件
*/
class Login extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  onFinish = async(values) => {
      let{username,password} = values;
      this.props.login(username,password);
  }

  render() { 
    const user = this.props.user;
    if(user && user._id){
      return <Redirect to="/home"></Redirect>
    }
    if(user.msg){
      message.error(user.msg)
    }

    return (  
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true,}}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {required: true,message: '请输入用户名'},
                {min: 4,message: '用户名至少4位'},
                {max: 12,message: '用户名最多12位'},
                {pattern: /^[a-zA-Z0-9_]+$/,message: '用户名必须是英文、数字或下划线组成'},
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' },]}
            >
              <Input prefix={<LockOutlined/>} type="password" placeholder="Password"/>
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">Login in</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
 
export default connect(
  state => ({user:state.user}),
  {login}
)(Login);
