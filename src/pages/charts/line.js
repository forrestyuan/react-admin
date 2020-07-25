import React, { Component } from 'react';
import {Card, Button} from 'antd'
import { Chart, Line as LineChart, Point } from 'bizcharts';

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      chartData : [
        {year: "1991",value: 3 },
        {year: "1992",value: 4 },
        {year: "1993",value: 3.5 },
        {year: "1994",value: 5 },
        {year: "1995",value: 4.9 },
        {year: "1996",value: 6 },
        {year: "1997",value: 7 },
        {year: "1998",value: 9 },
        {year: "1999",value: 13 }
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
         <Chart
          padding={[10,20,50,40]}
          autoFit
          height={500}
          data={chartData}
          scale={{ value: { min: 0 } }}
        >
          <LineChart position="year*value"  />
          <Point position="year*value" />
        </Chart>
      </Card>
    );
  }
}
 
export default Line;