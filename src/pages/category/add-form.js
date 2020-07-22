import React, { Component } from 'react';
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'

const { Option, OptGroup } = Select;
class AddForm extends Component {
  static propTypes = {
    categories:PropTypes.array.isRequired,
    parentId:PropTypes.string.isRequired,
    isSubCategory:PropTypes.bool.isRequired,
    getFormData:PropTypes.func.isRequired
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {  }
  }
  handlValChange=async(changedValues, allValues)=>{
    this.props.getFormData(allValues);
    this.formRef.current.validateFields();
  }

  componentDidUpdate(){
    this.formRef.current.resetFields();
  }
  render() { 
    const categoryLi = this.props.categories.map((item,index)=>{
      return (
        <Option value={item._id}>{item.name}</Option>
        ) 
    });
    return ( 
      <Form 
        ref={this.formRef}
        onValuesChange={this.handlValChange}
        initialValues={{categorySelect:this.props.parentId}}
      >
        <Form.Item 
          name="categorySelect"
        >
          <Select>
            {this.props.isSubCategory?null:(
              <OptGroup label="一级分类">
                <Option value="0">一级分类</Option>
              </OptGroup>
            )}
            {this.props.categories.length===0 ?null:(
              <OptGroup label="二级分类">
                {categoryLi}
              </OptGroup>
            )}
          </Select>
        </Form.Item>
        <Form.Item 
          name="categoryName"
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
 
export default AddForm;