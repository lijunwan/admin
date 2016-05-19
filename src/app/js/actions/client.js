export const CHECK_LOGIN = 'CHECK_LOGIN';
export const GET_USER_LIST = 'GET_USER_LIST';
import HttpRequest from 'superagent';

export function checkLogin(params) {
  return dispatch => {
    console.log("????")
    HttpRequest.post('/api/account/login')
      .send(params)
      .end(function(err,resp){
       //let info=loginCode(err, resp);
        dispatch({
          type: CHECK_LOGIN,
          data: resp.body
        });
    });
  };
}
export function getLog(){
  return dispatch => {
    HttpRequest.get('/api/log')
      .end(function(err,resp){
       //let info=loginCode(err, resp);
        dispatch({
          type: CHECK_LOGIN,
          data: resp.body
        });
    });
  };
}
export function logOut() {
  console.log("logout")
  return dispatch => {
    HttpRequest.del('/api/user/logout')
      .end(function(err,resp){
        window.location="/"
    });
  };
}
export function getUserList() {
  return dispatch => {
    HttpRequest.get('/api/user/getUserList')
      .end(function(err,resp){
        dispatch({
          type: GET_USER_LIST,
          data: resp.body
        });
    });
  };
}
