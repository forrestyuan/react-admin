import React from 'react';
import {
  HomeOutlined,
  ShoppingOutlined,
  ApartmentOutlined,
  AccountBookOutlined,
  UserOutlined,
  ThunderboltOutlined,
  DashboardOutlined,
  LineChartOutlined,
  PieChartOutlined,
  BarChartOutlined
} from '@ant-design/icons';
const menuList = [
  {title:"首页",key:"/home",path:"/home", isPublic:true,icon:<HomeOutlined/>,children:[]},
  {title:"商品",key:"/goods",path:"/goods",icon:<ShoppingOutlined/>,children:[
    {title:"品类管理",key:"/path",path:"/category",icon:<ApartmentOutlined/>,children:[]},
    {title:"商品管理",key:"/product",path:"/product",icon:<AccountBookOutlined/>,children:[]}
  ]},
  {title:"用户管理",key:"/user",path:"/user",icon:<UserOutlined/>,children:[]},
  {title:"角色管理",key:"/role",path:"/role",icon:<ThunderboltOutlined/>,children:[]},
  {title:"图表",key:"/charts",path:"/charts",icon:<DashboardOutlined />,children:[
    {title:"折线图",key:"/charts/line",path:"/charts/line",icon:<LineChartOutlined />,children:[]},
    {title:"柱形图",key:"/charts/bar",path:"/charts/bar",icon:<BarChartOutlined />,children:[]},
    {title:"饼图",key:"/charts/pie",path:"/charts/pie",icon:<PieChartOutlined />,children:[]},
  ]},
]

export default menuList;