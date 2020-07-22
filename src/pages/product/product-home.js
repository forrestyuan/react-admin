import React, { Component } from 'react'
import {Card, Button,Select, Input,Table,Tag,message} from 'antd';
import {SearchOutlined,PlusOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import {reqProducts,reqSearchProducts} from '../../api'

const {Option} = Select;
const {Search} = Input;
class ProductHome extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      loading:false,
      total:0,
      products:[
        {
          name:"手机手机",
          desc:"这是一部好手机",
          price:"2500",
          status:"1"
        },
        {
          name:"手机手机",
          desc:"这是一部好手机",
          price:"2500",
          status:"2"
        }
      ],
      searchType:"productName"
    }
    this.columns = [];//列定义数组
    this.pageSize = 1;
  }
  //初始化表格列的定义
  initCloumns=()=>{
    this.columns=[
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render:(price)=>{
          return `￥${price}`
        }
      },
      {
        width:100,
        title: '状态',
        dataIndex: 'status',
        render:(status)=>{
          let online = status === "1"? true : false;
          return(
            <span>
              <Button type="primary" size="small" >{online ? "下架":"上线"}</Button>
              <Tag color={online ? "green" : "red"} style={{marginTop:5}}>{online?"在售中":"已下架"}</Tag>
            </span>
          )
        }
      },
      {
        width:100,
        title: '操作',
        render:()=>{
          return(
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      }
    ]
  }
  //搜索商品
  searchProduct=async(searchKeyword)=>{
    if(searchKeyword && /\S/img.test(searchKeyword)){
      this.getProduct(0, searchKeyword)
    }else{
      message.warn("请输入搜索关键词")
    }
  }
  //获取指定页码的列表数据
  getProduct = async(pageNum,searchName=void 0)=>{
    this.setState({loading:true});
    let res;
    if(searchName){
        message.info("关键词搜索")
        res = await reqSearchProducts(pageNum,this.pageSize,searchName,this.state.searchType);
      }else{
        message.info("分页查询")
       res = await reqProducts(pageNum,this.pageSize);
    }
    this.setState({loading:false});
    //无数据，暂时return
    return;
    if(res.status === 0){
      const {total, list} = res.data;
      this.setState({
        total,products:list
      })
    }
  }
  
  componentWillMount(){
    this.initCloumns();
  }

  render() { 
    const {total,products,loading,searchType} = this.state;
    const selectBefore = (
      <Select defaultValue={searchType} onChange={value=>this.setState({searchType:value})} style={{width:120}}>
        <Option value="productName">按名称搜索</Option>
        <Option value="productDesc">按描述搜索</Option>
      </Select> 
    );
    const title=(
      <span> 
        <Search
          style={{width:"100%",maxWidth:420}}
          addonBefore={selectBefore}
          placeholder="输入关键字"
          enterButton={<SearchOutlined />}
          size="middle"
          onSearch={this.searchProduct}
        />
      </span>
    );
    const extra=(
      <Button type="primary" icon={<PlusOutlined/>}>添加商品</Button>
    )
    
    return ( 
      <Card title={title} extra={extra}>
        <Table 
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={products} 
          columns={this.columns} 
          pagination={{
            defaultPageSize:this.pageSize, 
            showQuickJumper:true,total,
            onChange:(pageNum)=>{this.getProduct(pageNum)}
          }}
        />;
        
      </Card>
    );
  }
}
 
export default ProductHome;