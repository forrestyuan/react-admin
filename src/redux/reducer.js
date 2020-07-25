/*
根据老的state和指定action返回新的state
*/
import {combineReducers} from 'redux'
import storageUtils from '../utils/storage'
import {SET_HEAD_TITLE,RECEIVE_USER,RESET_USER} from './action-types'

const initHeadTitle = "首页";
function headTitle(state = initHeadTitle, action){
  switch (action.type) {
    case SET_HEAD_TITLE: state = action.data; return state;
    default: return state;
  }
}

const initUser = storageUtils.getUser();

function user(state = initUser, action){
  switch (action.type) {
    case RECEIVE_USER: return action.user;
    case RESET_USER: return action.user;
    default: return state;
  }
}



export default combineReducers({
  headTitle,
  user
})