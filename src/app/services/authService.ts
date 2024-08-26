/* eslint-disable import/no-anonymous-default-export */
import requests from "./http";


class AuthService {
  register(payload: object){
    return requests.post("/users/signup", payload);
  }

  login(payload: object) {
    return requests.post("/users/login", payload);
  }

  forgotpassword(payload: object){
    return requests.post("/users/forgot-password",payload);
  }
  
 
};

export default new AuthService();