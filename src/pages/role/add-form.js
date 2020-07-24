import React, { Component } from 'react';
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'
class AddForm extends Component {
  static propTypes = {
    getFormData:PropTypes.func.isRequired
  }

  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {  }
  }
  handlValChange=async(changedValues, allValues)=>{
    this.props.getFormData(allValues);
  }
  componentDidUpdate() {
    this.formRef.current.resetFields()
  }

  render() { 
    return ( 
      <Form 
        ref={this.formRef}
        onValuesChange={this.handlValChange}
        initialValues={{name:this.props.roleName}}
      >
        <Form.Item 
          label="添加角色"
          name="name"
          rules={[
            {required: true, message: '请输入名称' },
            {pattern: /^.*[\S]+.*$/,message: '请输入名称'}
          ]}
        >
          <Input placeholder="请输入名称"></Input>
        </Form.Item>
      </Form>
    );
  }
}
 
export default AddForm;