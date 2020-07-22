/* 
封装axios库，函数的返回值是promise对象
*/
import axios from 'axios';
import {message} from 'antd';

export default function ajax(url, data={}, type="GET") {
  let promise, isRemoteReq = url.startsWith("http");
  return new Promise((resovle, reject)=>{
    if(isRemoteReq){
      promise = axios.get(url,{params:data});
    }else if(type === "GET"){
      promise = axios.get(url,{params:data});
    }else{
      promise = axios.post(url, data);
    }
    promise.then(res =>{
      resovle(isRemoteReq? res:res.data);
    }).catch(err=>{
      message.error("请求出错了"+err.message)
    })
  });
}
