export const GET_ORDER_LIST = 'GET_ORDER_LIST';
export const SEARCH_ORDER = 'SEARCH_ORDER';
import HttpRequest from 'superagent';
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
