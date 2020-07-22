import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
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
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  getMenuList=(menuList)=>{
    return menuList.map((val)=>{
      if(val.children.length){
        return(
          <SubMenu key={val.path} icon={val.icon} title={val.title}>
            {this.getMenuList(val.children)}
          </SubMenu>
        )
      }else{
        return (
          <Menu.Item key={val.path} icon={val.icon}>
            <Link to={val.path}>{val.title}</Link>
          </Menu.Item>
        )
      }
    })
  }
  getMenuOpenKey=(menuList, path)=>{
    for(let val of menuList){
      if(val.children.length){
        for(let item of val.children){
          if(path.includes(item.path)) return val.path;
        }
      }
    }
  }
  render() { 
    let path = `/${this.props.location.pathname.split("/")[1]}`;
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
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
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
export default withRouter(LeftNav);