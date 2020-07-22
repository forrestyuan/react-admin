import React, { Component } from 'react';
import {Form,Input} from 'antd'
import PropTypes from 'prop-types';

class UpdateForm extends Component {
  static propTypes ={
    categoryName:PropTypes.string.isRequired,
    getFormData:PropTypes.func.isRequired
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {  }
  }

  handlValChange=(changedValues, allValues)=>{
    this.formRef.current.validateFields();
    this.props.getFormData(allValues.categoryName)
  }
  componentDidUpdate(){
    this.formRef.current.resetFields();
  }
  render() {
    const {categoryName} = this.props;
    return ( 
      <Form 
        ref={this.formRef}
        onValuesChange={this.handlValChange}
        initialValues={{categoryName}}
      >
        <Form.Item name="categoryName"
          rules={[
            { required: true, message: '请输入分类名称' },
            {pattern: /^.*[\S]+.*$/,message: '请输入分类名称'}
          ]}
        >
          <Input placeholder="请输入分类名称"></Input>
        </Form.Item>
      </Form>
    );
  }
}
 
export default UpdateForm;