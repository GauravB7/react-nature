import axios from 'axios';

const USER_API_BASE_URL = "https://nature-paradise.herokuapp.com/user/product/";
const headers = {
    'content-type': 'application/json'
  };

class ProductService {

    getProducts(){
        return axios.get(USER_API_BASE_URL, {headers:headers});
    }

    getProduct(id){
        return axios.get(`${USER_API_BASE_URL}${id}`,{headers:headers});
    }

}

export default new ProductService()