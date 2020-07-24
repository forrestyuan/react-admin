import React, { Component } from 'react';
import {Form,Input,Select} from 'antd'
import PropTypes from 'prop-types'

const {Option} = Select;
const layout = {
  labelCol: {span: 5},
  wrapperCol: {span:17}
};
class UserForm extends Component {
  static propTypes = {
    getFormData:PropTypes.func.isRequired
  }

  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {  }
  }
  handlValChange=async(changedValues, allValues)=>{
    // alert(JSON.stringify(allValues))
    this.props.getFormData(allValues);
    // this.formRef.current.resetFields()
  }
  componentDidUpdate() {
    this.formRef.current.resetFields()
  }

  render() { 
    const {_id,username,password,phone,email,role_id} = this.props.user || {}
    const {roles} = this.props
    return ( 
      <Form 
        {...layout}
        ref={this.formRef}
        onValuesChange={this.handlValChange}
        initialValues={{
          username : username || "",
          password : password || "",
          phone : phone || "",
          email : email || "",
          role_id : role_id || "",
        }}
      >
        <Form.Item 
          label="用户名"
          name="username"
          rules={[
            {min:4, message: '长度不小于4' },
            {required: true, message: '请输入用户名' },
            {pattern: /^.*[\S]+.*$/,message: '请输入用户名'}
          ]}
        >
          <Input min={4} placeholder="请输入用户名"></Input>
        </Form.Item>
        {
          _id ? null :(
            <Form.Item 
              label="密码"
              name="password"
              rules={[
                {required: true, message: '请输入密码' },
                {pattern: /^.*[\S]+.*$/,message: '请输入密码'}
              ]}
            >
              <Input type="password" placeholder="请输入密码"></Input>
            </Form.Item>
          )
        }
        <Form.Item 
          label="手机号"
          name="phone"
          rules={[
            {required: true, message: '请输入手机号' },
            {pattern: /^[1-9][0-9]*$/,message: '请输入合法手机号'}
          ]}
        >
          <Input type="tel" placeholder="请输入名称"></Input>
        </Form.Item>
        <Form.Item 
          label="邮箱"
          name="email"
          rules={[
            {required: true, message: '请输入邮箱' },
            {pattern: /^.*[\S]+.*$/,message: '请输入邮箱'}
          ]}
        >
          <Input type="email" placeholder="请输入邮箱"></Input>
        </Form.Item>

        <Form.Item 
          label="角色"
          name="role_id"
          rules={[
            {required: true, message: '请选择角色' },
          ]}
        >
          <Select placeholder="请选择用户角色">
            {
              roles.map(role=><Option key={role._id} value={role._id}>{role.name}</Option>)
            }
          </Select>
        </Form.Item>
      </Form>
    );
  }
}
 
export default UserForm;