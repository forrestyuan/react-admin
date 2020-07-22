import React, { Component } from 'react';
import {Breadcrumb, Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import './index.less'
import {baiduWeather} from "../../api"
import memoryUtils from '../../utils/memoryUtils'
import store from '../../utils/storage'
import dayjs from 'dayjs'
import LinkButton from "../../components/link-button"

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      weather_data:{},
      currentTime:dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
  }
  async componentDidMount() {
    let res = await baiduWeather("深圳");
    this.setState({weather_data:res});
    this.intervalId = setInterval(() => {
      this.setState({currentTime:dayjs().format('YYYY-MM-DD HH:mm:ss')});
    }, 1000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  getTitle=()=>{
    const path = `/${this.props.location.pathname.split("/")[1]}`;
    for(let val of menuList){
      if(val.children.length){
        for(let item of val.children){
          if(item.path === path) return item.title;
        }
      }else{
        if(val.path === path) return val.title;
      }
    }
  }
  logout=()=>{
    Modal.confirm({
      title:"确定退出吗？",
      content:"清除登录状态",
      onOk:()=>{
        store.removeUser();
        memoryUtils.user = {};
        this.props.history.replace("/login")
      }
    })
  }
  render() { 
    return ( 
      <div className="header">
        <div className="header-top">
          <span>欢迎,{memoryUtils.user.username}</span>
          <LinkButton onClick={this.logout}>登出</LinkButton>
          {/* <span><a href="javascript:void(0)" onClick={this.logout}>登出</a></span> */}
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <Breadcrumb>
              <Breadcrumb.Item>{this.getTitle()}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="header-bottom-right">
            <span style={{marginRight:10}}>{this.state.currentTime}</span>
            <img src={this.state.weather_data.dayPictureUrl} alt="weather" />
            <span>{this.state.weather_data.weather}</span>
          </div>
        </div>
      </div>
     );
  }
}
 
export default withRouter(Header);