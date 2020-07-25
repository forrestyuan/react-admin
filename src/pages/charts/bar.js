import React, { Component } from 'react';
import {Card,Button} from 'antd'
import { Chart, Interval, Tooltip } from 'bizcharts';

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      chartData : [
        { genre: '家电产品', sold: 275 },
        { genre: '科技产品', sold: 155 },
        { genre: '生活用品', sold: 230 },
        { genre: '家具清洁', sold: 250 },
        { genre: '搬家服务', sold: 450 },
        { genre: '快递服务', sold: 250 },
        { genre: '组装服务', sold: 450 },
        { genre: '软件开发', sold: 250 },
        { genre: '系统搭建', sold: 450 }
      ] 
    }
  }
  render() { 
    const {chartData} = this.state;
    const title = (
      <Button type="primary">刷新</Button>
    )
    return (
      <Card title={title}>
         <Chart height={400} autoFit data={chartData}  interactions={['active-region']} padding={[30, 30, 30, 50]}  >
            <Interval position="genre*sold" />
            <Tooltip shared />
          </Chart>
      </Card>
    );
  }
}
 
export default Bar;