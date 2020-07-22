import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import storage from "./utils/storage"
import memoryUtils from "./utils/memoryUtils"
//读取 local中保存user，保存到内存中
const user = storage.getUser();
memoryUtils.user = user;
console.log("index.js",memoryUtils.user)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
