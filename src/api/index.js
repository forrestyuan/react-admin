import ajax from "./ajax";
import {baidu_ak} from '../config/apikey';
import jsonp from 'jsonp';
import{message} from 'antd'
/**
 * 用户登录
 * @param {String} username 用户名
 * @param {String} password 密码
 */
export const reqLogin=(username, password)=>ajax("/login",{username,password},"POST");
/**
 * 添加用户
 * @param {Object} user 用户信息对象
 */
export const reqAddUser = (user)=>ajax("/manage/user/add",user,"POST");

/**
 * 获取城市天气
 * @param {String} location 城市
 */
export const baiduWeather = (location)=>{
  return new Promise((resolve, reject)=>{
    let url = `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=${baidu_ak}`;
    jsonp(url,{},(err, data)=>{
      if(!err && data.status ==="success"){
        console.log(data)
        const {dayPictureUrl,weather}= data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      }else{
        message.error("获取天气失败！")
      }
    })
  })
}
/**
 * 获取一级/二级分类的列表
 * @param {String} parentId 一级分类id
 */
export const reqCategory = (parentId)=>ajax('/manage/category/list',{parentId});
/**
 * 添加二级分类
 * @param {String} categoryName 分类名称
 * @param {String} parentId 一级分类id
 */
export const reqAddCategory = (categoryName,parentId)=>ajax('/manage/category/add',{categoryName,parentId},"POST");

/**
 * 更新二级分类
 * @param {String} categoryName 分类名称
 * @param {String} categoryId 一级分类id
 */
export const reqUpdateCategory = (categoryName,categoryId)=>ajax('/manage/category/update',{categoryName,categoryId},"POST");

/**
 * 获取商品分页列表
 * @param {Number} pageNum 页码
 * @param {Number} pageSize 每页数据的条数
 */
export const reqProducts =(pageNum,pageSize)=> ajax('/manage/product/list',{pageNum, pageSize})
/**
 * 搜索产品
 * @param {Number} pageNum 页码
 * @param {Number} pageSize 显示条数
 * @param {String} searchName 搜索关键词
 * @param {String} searchType 搜索类型
 */
export const reqSearchProducts =(pageNum,pageSize, searchName,searchType)=> ajax('/manage/product/search',{pageNum, pageSize,[searchType]:searchName})
