import axios from 'axios';

const USER_API_BASE_URL = "https://nature-paradise.herokuapp.com/user/contact/";
const headers = {
    'content-type': 'application/json'
  };

class contactService {

    addContact(name,email,query){
        return axios.post(USER_API_BASE_URL,{name:name,email:email,query:query},{headers:headers});
    }

}

export default new contactService()