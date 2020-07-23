import React, { Component } from 'react';
import {Card, Button,Input,Form,Cascader,message} from 'antd'
import LinkButton from '../../components/link-button'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {reqCategories,reqAddOrUpdateProduct} from '../../api'
import PictureWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
const {Item} = Form;
const {TextArea} = Input;
const layout = {
  labelCol: {span: 3},
  wrapperCol: {span: 16}
};
const options = [];
class ProductAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      options
    }
    this.pwRef = React.createRef();
    this.editorRef = React.createRef();
  }
  //初始化级联配置
  initCascaderOption=async (categories)=>{
    let optList = [];
    categories.forEach(item=>{
      optList.push({
        value: item._id,
        label:item.name,
        isLeaf:false
      });
    });
    //更新产品逻辑
    //如果是一个二级分类商品的更新
    const {isUpdate, product} = this;
    const {pCategoryId} = product;
    if(isUpdate && pCategoryId !== "0"){
      //获取对应的二级分类列表
      const subCategories = await this.getCategories(pCategoryId);
      const childOptions = subCategories.map(item=>({
          label: item.name,
          value: item._id,
          isLeaf:true
      }))
      //生成二级下拉列表
      let targetOption = optList.find(option => option.value === pCategoryId);
      targetOption.children = childOptions;
    }
    this.setState({options:optList})
  }
  // 获取一级或者二级分类列表，并显示
  //async 函数返回的是一个新的promise 对象,promise的结果和值由async的结果来决定
  getCategories=async(parentId)=>{
    const res = await reqCategories(parentId);
    if(res.status === 0){
      const categories = res.data;
      //如果是一级分类
      if(parentId === "0"){
        this.initCascaderOption(categories);
      }else{//二级分类
        return categories; //当前asyn函数返回的promise就会成功且值为categories
      }
    }
  }
  //提交表单
  onFinish = async values => {
    //values 包含下列信息
    // name
    // desc
    // categoryIds
    // price
    // imgs
    // detail
    if(this.isUpdate){
      values._id = this.product._id;
    }
    const{categoryIds} = values;
    if(categoryIds.length === 1){
      values.pCategoryId = '0';
      values.categoryId = categoryIds[0];
    }else{
      values.pCategoryId = categoryIds[0];
      values.categoryId = categoryIds[1];
    }
    delete values.categoryIds;
    values.imgs = this.pwRef.current.getFileNameList();
    values.detail = this.editorRef.current.getEditorValue();
    // alert(JSON.stringify(values))
    const res = await reqAddOrUpdateProduct(values);
    if(res.status === 0){
      message.success(`${this.isUpdate ? '更新':'添加'}商品成功`)
      this.props.history.goBack();
    }else{
      message.error(`${this.isUpdate ? '更新':'添加'}商品失败`)
    }
    
  }
  //加载级联数据
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // load options lazily
    const subCategories = await this.getCategories(targetOption.value);
    targetOption.loading = false;
    if(subCategories  && subCategories.length > 0){
      const childOptions = subCategories.map(item=>({
          label: item.name,
          value: item._id,
          isLeaf:true
        })
        )
        targetOption.children = childOptions;
      }else{
      targetOption.isLeaf = true;
    }
    this.setState({
      options: [...this.state.options],
    });
  };

  componentDidMount() {
    this.getCategories("0");
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    //去除路由携带的state
    const product = this.props.location.state;
    this.isUpdate = !!product;
    this.product = product || {};

  }
  render() { 
    const {isUpdate,product} = this;
    let updateCategoryList = [];
    if(product.pCategoryId && product.pCategoryId === "0"){
      updateCategoryList = [product.categoryId]
    }else{
      updateCategoryList = [product.pCategoryId,product.categoryId]
    }
    const title = (
      <>
        <span>
          <LinkButton onClick={()=>{this.props.history.goBack()}}><ArrowLeftOutlined/></LinkButton>
          <span>{isUpdate?'修改商品':'添加商品'}</span>
        </span>
      </>
    );
    const rules =[
      {required:true,message:"请输入对应字段值"},
      {pattern:/\S/,message:"请输入对应字段值"},
    ]
    return ( 
      <Card title={title}>
        <Form 
          {...layout}
          onFinish={this.onFinish}
          initialValues={{
            name:isUpdate?product.name:"",
            desc:isUpdate?product.desc:"",
            categoryIds:isUpdate?updateCategoryList:[],
            price:isUpdate?product.price:0,
            imgs:isUpdate?product.imgs:[],
            detail:isUpdate?product.detail:""
          }}
        >
          <Item 
            label="商品名称" 
            name="name"
            rules={rules}
          >
            <Input placeholder="请输入商品名称"></Input>
          </Item>
          <Item 
            label="商品描述" 
            name="desc"
            rules={rules}
          >
            <TextArea rows={4} placeholder="请输入商品描述"></TextArea>
          </Item>
          <Item 
            label="商品价格" 
            name="price"
            rules={rules}
          >
            <Input
              type="Number"
              min={0}
              addonBefore="￥"
              style={{width:200}}
            />
          </Item>
          <Item  
            label="商品分类" 
            name="categoryIds"
            rules={rules}
          >
          <Cascader
            options={this.state.options}
            loadData={this.loadData}
            changeOnSelect
          />
          </Item>
          <Item  label="商品图片" name="imgs">
            <PictureWall ref={this.pwRef} imgs={isUpdate? product.imgs : []}></PictureWall>
          </Item>
          <Item  label="商品详情" name="detail">
            <RichTextEditor ref={this.editorRef} detail={isUpdate? product.detail : ""}></RichTextEditor>
          </Item>
          <Item >
            <Button type="primary" htmlType="submit">{isUpdate?'更新':'提交'}</Button>
          </Item>
          
        </Form>
      </Card>
    );
  }
}
 
export default ProductAdd;