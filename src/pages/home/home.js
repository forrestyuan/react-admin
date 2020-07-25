import React, { Component } from 'react';
import "./home.less"
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="home">
        欢迎使用FFF后台，首内容，后续更新
      </div>
     );
  }
}
 
export default Home;