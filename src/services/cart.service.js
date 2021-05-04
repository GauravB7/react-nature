import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8081/user/cart/";
const headers = {
    'content-type': 'application/json'
  };

class CartService {

    addItems(email,productsToAdd){
        return axios.post(USER_API_BASE_URL,{email:email,productsToAdd:productsToAdd} ,{headers:headers});
    }

    getItems(email){
        console.log(email);
        return axios.get(USER_API_BASE_URL,{email:email},{headers:headers});
    }

    emptyCart(email){
        console.log(email);
        return axios.put(USER_API_BASE_URL+"empty",{email:email},{headers:headers});
    }

    updateCart(email,productsToUpdate){
        return axios.put(USER_API_BASE_URL+"update",{email:email,productsToUpdate:productsToUpdate},{headers:headers});
    }

}

export default new CartService()