import store from 'good-storage';
const USER_KEY = "user_key"
export default {
  saveUser(user){
    // localStorage.setItem('user_key', JSON.stringify(user));
    store.set(USER_KEY,user)
  },
  getUser(){
    // return JSON.parse(localStorage.getItem(USER_KEY));
    return store.get(USER_KEY) || {};
  },
  removeUser(){
    // return localStorage.removeItem(USER_KEY);
    store.remove(USER_KEY);
  }
}