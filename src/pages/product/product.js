import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import ProductHome from './product-home'
import ProductAdd from './product-add'
import ProductDetail from './product-detail'

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <Switch>
        <Route path='/product' exact component={ProductHome}/>
        <Route path='/product/add' component={ProductAdd}/>
        <Route path='/product/detail' component={ProductDetail}/>
      </Switch>
    );
  }
}
 
export default Product;