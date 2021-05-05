import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8081/user/order/";
const headers = {
    'content-type': 'application/json'
  };

class OrderService {

    addItems(email,total_per_item,total){
        return axios.post(USER_API_BASE_URL+"add",{email:email,total_per_item:total_per_item,total:total} ,{headers:headers});
    }

    getItems(email){
        return axios.post(USER_API_BASE_URL,{email:email},{headers:headers});
    }

}

export default new OrderService()