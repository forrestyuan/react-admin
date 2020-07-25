import React, { Component } from 'react';
import {Card, Button} from 'antd'
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate
} from 'bizcharts';

class Pie extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      chartData :[
        { year: '2001', population: 41.8 },
        { year: '2002', population: 38 },
        { year: '2003', population: 33.7 },
        { year: '2004', population: 30.7 },
        { year: '2005', population: 25.8 },
        { year: '2006', population: 31.7 },
        { year: '2007', population: 33 },
        { year: '2008', population: 46 },
        { year: '2009', population: 38.3 },
        { year: '2010', population: 28 },
        { year: '2011', population: 42.5 },
        { year: '2012', population: 30.3 },
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
         <Chart height={400} data={chartData} autoFit>
            <Coordinate type="polar" />
            <Axis visible={false} />
            <Tooltip showTitle={false} />
            <Interval
              position="year*population"
              adjust="stack"
              element-highlight
              color="year"
              style={{
                lineWidth: 1,
                stroke: '#fff',
              }}
              label={['year', {
                offset: -15,
              }]}
            />
          </Chart>
        );
      </Card>
    );
  }
}
export default Pie;