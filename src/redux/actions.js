/*
包含n个action creator函数的模块
同步action:对象{type:"xxx", data:value}
异步action: 函数 dispatch=>{}
*/
import {SET_HEAD_TITLE,RECEIVE_USER,RESET_USER} from "./action-types"
import {reqLogin} from '../api'
import storageUtils from "../utils/storage"
// 设置头部标题的action
export const setHeadTitle = (headTitle)=>({type:SET_HEAD_TITLE , data:headTitle});

// 接收用户的同步action
export const receiveUser = (user)=>({type:RECEIVE_USER, user})
// 设置登录的异步action
export const login = (username, password) => {
  return async dispatch => {
    //执行异步请求
    const res = await reqLogin(username, password);
    //成功请求，分发成功的同步action
    if(res.status === 0){
      const user = res.data;
      storageUtils.saveUser(res.data);
      dispatch(receiveUser(user));
    }else{
      const user = {msg:"用户名或密码不正确"};
      dispatch(receiveUser(user));
    }
  }
}

//退出登录的同步action
export const logout = ()=>{
  storageUtils.removeUser();
  return  {type:RESET_USER,user:{}}
}
