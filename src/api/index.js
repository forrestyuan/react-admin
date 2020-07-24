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
export const reqAddOrUpdateUser = (user)=>ajax(`/manage/user/${user._id?'update':'add'}`,user,"POST");

/**
 * 获取城市天气
 * @param {String} location 城市
 */
export const baiduWeather = (location)=>{
  return new Promise((resolve, reject)=>{
    let url = `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=${baidu_ak}`;
    jsonp(url,{},(err, data)=>{
      if(!err && data.status ==="success"){
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
export const reqCategories = (parentId)=>ajax('/manage/category/list',{parentId});
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
 * 获取分类id对应的分类名称
 * @param {String} categoryId 分类id
 */
export const reqCategory=(categoryId)=>ajax('/manage/category/info',{categoryId});
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
/**
 * 更新产品状态
 * @param {String} productId 产品id
 * @param {Number} status 产品状态 1:online 2:offline
 */
export const reqUpdateProductStatus =(productId,status)=> ajax('/manage/product/updateStatus',{productId, status},'POST')

/**
 * 删除图片操作 
 * @param {String} name 删除图片名称
 */
export const reqDeleteImg = (name)=>ajax('/manage/img/delete',{name},"POST")
/**
 * 添加或者更新产品
 * @param {Object} product 产品对象
 */
export const reqAddOrUpdateProduct = (product)=>ajax(`/manage/product/${product._id?'update':'add'}`,product,"POST")
/**
 * 请求角色列表
 */
export const reqRoleList = ()=> ajax('/manage/role/list')
/**
 * 添加角色
 * @param {String} roleName 角色名称
 */
export const reqAddRole = (roleName)=> ajax('/manage/role/add',{roleName},"POST")
/**
 * 更新角色包含的权限
 * @param {Object} role 角色对象
 */
export const reqUpdateRole = (role)=> ajax('/manage/role/update',role,"POST")
/**
 * 获取用户列表
 */
export const reqUsers = ()=>ajax("/manage/user/list");
/**
 * 删除用户
 * @param {String} userId 用户ID
 */
export const reqDeleteUser = (userId)=>ajax("/manage/user/delete",{userId},"POST");