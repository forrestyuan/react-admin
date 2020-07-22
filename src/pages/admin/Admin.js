import React, { Component } from 'react';
import {Redirect,Route, Switch} from 'react-router-dom'
import memoryUtils from "../../utils/memoryUtils";
import {Layout} from 'antd';
import "./Admin.less"
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Pie from '../charts/pie'
import Line from '../charts/line'
import Bar from '../charts/bar'

/* 
后台管理的路由组件
*/
const {Footer, Content} = Layout;
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     }
  }
  render() { 
    const user = memoryUtils.user;
    if(!user || !user._id){
      return <Redirect to="/login"></Redirect>
    }
    return ( 
      <Layout className="admin-wrapper">
        <aside>
          <LeftNav collapsed={this.toggleCollapsed}></LeftNav>
        </aside>
        <Layout>
          <Header></Header>
          <Content style={{margin:20,padding:10,background:"#fff"}}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to="/home"></Redirect>              
            </Switch>
          </Content>
          <Footer style={{textAlign:"center",color:"#aaa"}}>
            推荐使用谷歌浏览器，获得页面最佳操作体验
          </Footer>
        </Layout>
      </Layout>
     );
  }
}
 
export default Admin;