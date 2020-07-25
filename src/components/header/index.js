import React, { Component } from 'react';
import {Breadcrumb, Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions'

import './index.less'
import {baiduWeather} from "../../api"
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

  logout=()=>{
    Modal.confirm({
      title:"确定退出吗？",
      content:"清除登录状态",
      onOk:()=> {
        this.props.logout();
      }
    })
  }
  render() {
    const {headTitle,user} = this.props;
    const {currentTime,weather_data} = this.state;
    return ( 
      <div className="header">
        <div className="header-top">
          <span>欢迎,{user.username}</span>
          <LinkButton onClick={this.logout}>登出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <Breadcrumb>
              <Breadcrumb.Item>FFF后台</Breadcrumb.Item>
              <Breadcrumb.Item>{headTitle}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="header-bottom-right">
            <span style={{marginRight:10}}>{currentTime}</span>
            <img src={weather_data.dayPictureUrl} alt="weather" />
            <span>{weather_data.weather}</span>
          </div>
        </div>
      </div>
     );
  }
}
 
export default connect(
  state=>({headTitle:state.headTitle,user:state.user}),
  {logout}
)(withRouter(Header));