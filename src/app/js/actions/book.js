export const GET_BOOK_TYPE = 'GET_BOOK_TYPE';
import HttpRequest from 'superagent';
export function getBookType () {
	 return dispatch => {
    HttpRequest.get('/api/book/bookMenu')
      .end(function(err,resp){
 	    dispatch({
          type: GET_BOOK_TYPE,
          data: resp.body
        });
    });
  };
}