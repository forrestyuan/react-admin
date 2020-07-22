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
  {title:"首页",path:"/home",icon:<HomeOutlined/>,children:[]},
  {title:"商品",path:"/goods",icon:<ShoppingOutlined/>,children:[
    {title:"品类管理",path:"/category",icon:<ApartmentOutlined/>,children:[]},
    {title:"商品管理",path:"/product",icon:<AccountBookOutlined/>,children:[]}
  ]},
  {title:"用户管理",path:"/user",icon:<UserOutlined/>,children:[]},
  {title:"角色管理",path:"/role",icon:<ThunderboltOutlined/>,children:[]},
  {title:"图表",path:"/charts",icon:<DashboardOutlined />,children:[
    {title:"折线图",path:"/charts/line",icon:<LineChartOutlined />,children:[]},
    {title:"柱形图",path:"/charts/bar",icon:<BarChartOutlined />,children:[]},
    {title:"饼图",path:"/charts/pie",icon:<PieChartOutlined />,children:[]},
  ]},
]

export default menuList;