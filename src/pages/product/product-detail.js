import React, { Component } from 'react';
import {Card,List} from 'antd'
import {ArrowLeftOutlined,LineOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import {reqCategory} from '../../api'
import './product-detail.less'
import {BASE_IMG_URL} from '../../config/constants'
const {Item} = List;
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      cName1:"",//一级分类名称
      cName2:"",//二级分类名称
    }
  }
  async componentDidMount() {
    const{categoryId,pCategoryId}=this.props.location.state.product;
    if(pCategoryId === "0"){
      const res = await reqCategory(categoryId);
      this.setState({cName1:res.data.name})
    }else{
      const res = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
      this.setState({cName1:res[0].data.name,cName2:res[1].data.name})
    }
  }
  render() { 
    //读取携带的state数据
    const {name,desc,price,detail,imgs} = this.props.location.state.product;
    const {cName1,cName2} = this.state;
    const title = (
      <>
        <LinkButton onClick={()=>{this.props.history.goBack()}}><ArrowLeftOutlined /></LinkButton>
        <span>商品详情</span>
      </>
    );
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item className="product-detail-item">
            <span className="product-detail-tit">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item  className="product-detail-item">
            <span className="product-detail-tit">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item  className="product-detail-item">
            <span className="product-detail-tit">商品价格:</span>
            <span>￥{price}</span>
          </Item>
          <Item  className="product-detail-item">
            <span className="product-detail-tit">所属分类:</span>
            <span>{cName1} {cName2 ? <LineOutlined />: null} {cName2}</span>
          </Item>
          <Item  className="product-detail-item">
            <span className="product-detail-tit">商品图片:</span>
            <span className="product-detail-img">
              {
                imgs.map(item=><img key={item} src={BASE_IMG_URL+item} alt="product" />)
              }
            </span>
          </Item>
          <Item  className="product-detail-item">
            <span className="product-detail-tit">商品详情:</span>
            <span dangerouslySetInnerHTML={{__html:detail}}></span>
          </Item>
        </List>
      </Card>
    );
  }
}
 
export default ProductDetail;