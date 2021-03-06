import axios from 'axios';

const USER_API_BASE_URL = "https://nature-paradise.herokuapp.com/user/category/";
const headers = {
    'content-type': 'application/json'
  };

class ProductCategory {

    getProductCategories(){
        return axios.get(USER_API_BASE_URL, {headers:headers});
    }

    getProductByCategories(id) {
        const newUrl = `${USER_API_BASE_URL}${id}`;
        //console.log(newUrl);
        return axios.get(newUrl, {headers:headers});
      }
    
    getProductCategory(id){
        const url = `https://nature-paradise.herokuapp.com/user/categoryById/${id}`;
        return axios.get(url,{headers:headers});
    }
}

export default new ProductCategory()