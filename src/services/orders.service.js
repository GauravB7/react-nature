import axios from 'axios';
const tokenProvider = require('axios-token-interceptor');

 
const instance = axios.create({
  baseURL: 'https://nature-paradise.herokuapp.com/user/order'
});

instance.interceptors.request.use(tokenProvider({
  getToken: () => {
    if(localStorage.getItem('id_token')){
      return localStorage.getItem('id_token').split("Bearer ")[1];
    }
}
})); 

const headers = {
    'content-type': 'application/json'
  };

class OrderService {

    addItems(email,total_per_item,total){
        return instance.post("add",{email:email,total_per_item:total_per_item,total:total} ,{headers:headers});
    }

    getItems(email){
        return instance.post("",{email:email},{headers:headers});
    }

}

export default new OrderService()