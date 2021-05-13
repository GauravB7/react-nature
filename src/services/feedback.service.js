import axios from 'axios';

const USER_API_BASE_URL = "https://nature-paradise.herokuapp.com/user/feedback/";
const headers = {
    'content-type': 'application/json'
  };

class feedbackService {

    addFeedback(name,email,comment){
        return axios.post(USER_API_BASE_URL,{name:name,email:email,comment:comment},{headers:headers});
    }

}

export default new feedbackService()