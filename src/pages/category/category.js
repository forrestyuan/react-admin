import React, { Component } from 'react';
import {Card,Table,Button,message,Modal} from 'antd'
import {PlusOutlined,ArrowRightOutlined} from "@ant-design/icons"
import LinkButton from '../../components/link-button'
import AddForm from './add-form'
import UpdateForm from './update-form'
import {reqCategory,reqUpdateCategory,reqAddCategory} from '../../api'

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading:false,//表格加载状态
      categories:[],//一级分类列表
      subCategories:[],//二级分类列表
      parentId:'0', //当前需要显示的分类列表的parentId
      parentName:"", //当前需要显示的分类列表的父分类名称
      showStatus:0,//标识添加/更新确认框是否显示 0都不显示，1显示添加，2：显示更新
    }
    this.columns=[];//定义列格式
    this.addedCategoryName=void 0;//新添加的分类名称
    this.addedCategoryParentId=void 0; //添加的分类所属分类的ID
    this.willUpdateCategory={}; // 需要被更新的分类,从表格中选择的分类
    this.updatedCategoryName=void 0; //更新后的分类名称

  }
  //出事列格式
  initColunm=()=>{
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name'//显示数据对应的属性名
      },
      {
        title: '操作',
        width:300,
        render:(row)=>{ // 返回需要显示的界面标签
          return(
            <span>
              <LinkButton onClick={()=>this.showUpdate(row)}>修改分类</LinkButton>
              {
                this.state.parentId === "0" ?
                  <LinkButton onClick={()=>{this.showSubCategories(row)}}>查看子分类</LinkButton>
                  :null
              }
            </span>
          )
        }
      },
    ];
  }
  //显示指定一级分类对象的二子列表
  showSubCategories=(category)=>{
    //更新状态
    this.setState({
      parentId:category._id, 
      parentName:category.name
    },()=>{ //回调函数在状态更新后且render之后执行
      //获取二级分类列表
      this.getCategory();
    });
  }
  //显示一级列表
  showCategory=()=>{
    //更新为显示一级列表的状态
    this.setState({
      parentId:"0",
      parentName:"",
      subCategories:[]
    })
  }
  //获取一级分类列表
  getCategory = async()=>{
    this.setState({loading:true})
    let res = await reqCategory(this.state.parentId);
    this.setState({loading:false})
    if(res.status === 0){
      //取出分类数组（可能是一级也可能是二级分类）
      message.success("刷新分类数据");
      if(this.state.parentId === '0'){
        //更新一级分类
        this.setState({categories:res.data})
      }else{
        this.setState({subCategories:res.data})
      }
    }else{
      message.error("获取分类失败");
    }
  }
  //响应点击取消Modal
  handleCancel=()=>this.setState({showStatus:0})
  
  //显示添加分类 
  showAdd=()=>this.setState({showStatus:1});
  
  //添加分类
  handleAddCategory=async()=>{
    let {addedCategoryName,addedCategoryParentId} = this;
    let {parentId} = this.state;

    if(addedCategoryName && /\S+/.test(addedCategoryName)){
      addedCategoryName = addedCategoryName.replace(/ /img,"");
      this.setState({showStatus:0});
      let res = await reqAddCategory(addedCategoryName,addedCategoryParentId);
      if(res.status === 0){
        //添加的分类就是当前分类列表下的分类
        if(parentId === addedCategoryParentId){
          this.getCategory();
        } 
      }
    }else{
      message.warn("请输入分类名称")
    }
    
  }
  //显示更新分类
  showUpdate=(category)=>{
    this.willUpdateCategory = category;
    //保存分类对象
    this.setState({showStatus:2});
  }
  //更新分类
  handleUpdateCategory=async()=>{
    let {updatedCategoryName,willUpdateCategory}=this;
    updatedCategoryName = updatedCategoryName || willUpdateCategory.name;
    if(/\S+/.test(updatedCategoryName)){
      updatedCategoryName = updatedCategoryName.replace(/ /img,"");
      this.setState({showStatus:0});
      //updatedCategoryName来自于子组件的Form表单
      let res = await reqUpdateCategory(updatedCategoryName,willUpdateCategory._id);
      if(res.status === 0){
        this.getCategory();
      }
    }else{
      message.warn("请输入分类名称")
    }
  }
  //组件件通信,子组件调用向父组件传值
  getUpdateFormData=(data)=>this.updatedCategoryName = data;
  
  getAddFormData=(data)=>{
    this.addedCategoryParentId = data.categorySelect;
    this.addedCategoryName = data.categoryName;
  }
  //为第一次render准备数据
  componentWillMount(){
    this.initColunm();
  }
  //执行异步任务
  componentDidMount() {
    this.getCategory();
  }

  render() { 
    const {loading, categories, parentId, subCategories,parentName,showStatus} = this.state;
    const updateCategory = this.willUpdateCategory;
    const extra = (<Button type="primary" onClick={this.showAdd} icon={<PlusOutlined />}>添加</Button>)
    const title = parentId === '0'?"一级分类列表":(
      <span>
        <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
        <ArrowRightOutlined style={{marginRight:5}}/>
        <span>{parentName}</span>
      </span>
    )
    return ( 
      <div>
        <Card title={title} extra={extra} style={{ width: "100%" }}>
          <Table 
            bordered={true} 
            rowKey="_id"
            loading={loading}
            dataSource={parentId==='0'?categories:subCategories} 
            pagination={{defaultPageSize:5,showQuickJumper:true}}
            columns={this.columns} />;
        </Card>

        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.handleAddCategory}
          onCancel={this.handleCancel}
        >
          <AddForm 
            categories={categories} 
            parentId={parentId}
            isSubCategory={parentId === "0" ? false: true}
            getFormData={(data)=>this.getAddFormData(data)}
          />
        </Modal>

        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.handleUpdateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm 
            categoryName={updateCategory.name} 
            getFormData={(data)=>this.getUpdateFormData(data)}
          />
        </Modal>
      </div> 
    );
  }
}
 
export default Category;