export const GET_ORDER_LIST = 'GET_ORDER_LIST';
export const SEARCH_ORDER = 'SEARCH_ORDER';
export const GET_ORDER_INFO = 'GET_ORDER_INFO';
export const GET_UNSEND_ORDER = 'GET_UNSEND_ORDER';
export const GET_ORDER_STATIS = 'GET_ORDER_STATIS';
import HttpRequest from 'superagent';
import {message} from 'antd';
export function getOrderList () {
	 return dispatch => {
    HttpRequest.get('/api/order/orderList')
      .end(function(err,resp){
 	    dispatch({
          type: GET_ORDER_LIST,
          data: resp.body
        });
    });
  };
}
export function searchOrder (params) {
	 return dispatch => {
    HttpRequest.get('/api/order/searchOrder')
	  .query(params)
      .end(function(err,resp){
 	    dispatch({
          type: GET_ORDER_LIST,
          data: resp.body
        });
    });
  };
}
export function sendOrde (params) {
	 return dispatch => {
    HttpRequest.get('/api/order/sendOrde')
	  .query(params)
      .end(function(err,resp){
		if(resp.status == 200) {
			message.success('发货成功');
		}
 	    dispatch({
          type: GET_ORDER_LIST,
          data: resp.body
	  });
    });
  };
}
export function getOrderInfo (params) {
	 return dispatch => {
    HttpRequest.get('/api/order/getOrderInfo')
	  .query(params)
      .end(function(err,resp){
 	    dispatch({
          type: GET_ORDER_INFO,
          data: resp.body
	  });
    });
  };
}
export function getOrderUnsend (params) {
	 return dispatch => {
    HttpRequest.get('/api/order/unsendOrder')
      .end(function(err,resp){
 	    dispatch({
          type: GET_UNSEND_ORDER,
          data: resp.body
	  });
    });
  };
}
export function getOrderStatistics(params) {
  return dispatch => {
    HttpRequest.get('/api/order/statistc')
      .query(params)
      .end(function(err,resp){
      dispatch({
        type: GET_ORDER_STATIS,
        data: resp.body
      });
    });
  };
}
