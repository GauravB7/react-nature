import axios from 'axios';
const tokenProvider = require('axios-token-interceptor');

 
const instance = axios.create({
  baseURL: 'http://localhost:8081/user/cart'
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

class CartService {

    addItems(email,productsToAdd){
        return instance.post("",{email:email,productsToAdd:productsToAdd} ,{headers:headers});
    }

    getItems(email){
        console.log(email);
        return instance.post("id",{email:email},{headers:headers});
    }

    emptyCart(email){
        console.log(email);
        return instance.put("empty",{email:email},{headers:headers});
    }

    updateCart(email,productsToUpdate){
        return instance.put("update",{email:email,productsToUpdate:productsToUpdate},{headers:headers});
    }

}

export default new CartService()