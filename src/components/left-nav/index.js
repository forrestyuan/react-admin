import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setHeadTitle} from '../../redux/actions'

import './index.less'
import Logo from '../../assets/logo.png'
import { Menu, Layout} from 'antd';
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;
const {Sider} = Layout;
class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed:false
    }
  }

  onCollapse = collapsed => this.setState({ collapsed });

  getMenuList=(menuList)=>{
    return menuList.map((val)=>{
      if(this.hasAuth(val)){
        if(val.children.length){
          return(
            <SubMenu key={val.path} icon={val.icon} title={val.title}>
              {this.getMenuList(val.children)}
            </SubMenu>
          )
        }else{
          if(this.pathname === val.path){
            this.props.setHeadTitle(val.title);
          }
          return (
            <Menu.Item key={val.path} icon={val.icon}>
              <Link to={val.path} onClick={()=>this.props.setHeadTitle(val.title)}>{val.title}</Link>
            </Menu.Item>
          )
        }
      }
    })
  }
  //判断当前登录用户对item是否有权限
  hasAuth=(item)=>{
    const {user} = this.props;
    const {key,isPublic} = item
    const menus = user.role.menus;
    if(isPublic || menus.includes(key)){
      return true;
    }else if(item.children){
      return !!item.children.find(child => menus.includes(child.key))
    }
    return false;
  }
  //
  getMenuOpenKey=(menuList, path)=>{
    for(let val of menuList){
      if(val.children.length){
        for(let item of val.children){
          if(item.path.includes(path)) return val.path;
        }
      }
    }
  }
  render() { 
    this.pathname =this.props.location.pathname;

    const path = `/${this.pathname.split("/")[1]}`;
    let openKey = this.getMenuOpenKey(menuList,path);
    return (  
      <Sider className="left-sider" collapsible  collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Link to="/" className="left-nav">
          <header className="left-nav-header">
            <img src={Logo} alt="" />
            {this.state.collapsed ? "": <h1>FFF后台</h1>}
          </header>
        </Link>
        <Menu
          selectedKeys={[this.pathname]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {this.getMenuList(menuList)}
        </Menu>
      </Sider>
    );
  }
}
 /**
  * withRoute高阶组件
  * 包装非路由组件，向传递的组件传递三个参数，history，location、match
  */
export default connect(
  state=>({user:state.user}),
  {setHeadTitle}
)(withRouter(LeftNav));