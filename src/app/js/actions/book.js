export const GET_BOOK_TYPE = 'GET_BOOK_TYPE';
export const ADD_BOOK = 'ADD_BOOK';
export const GET_BOOK_LIST = 'GET_BOOK_LIST';
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
export function addBook(params) {
	return dispatch => {
	   HttpRequest.get('/api/book/addbook')
	   .query(params)
		.end(function(err,resp){
		   dispatch({
			 type: ADD_BOOK,
			 data: resp.body
		   });
	   });
 	};
}
export function clearBookInfo() {
	return dispatch => {
		dispatch({
			type: ADD_BOOK,
			data: {},
		})
	}
}
export function modifyBookInfo(params) {
	return dispatch => {
	   HttpRequest.get('/api/book/editBookInfo')
	   .query(params)
		.end(function(err,resp){
		   dispatch({
			 type: ADD_BOOK,
			 data: resp.body
		   });
	   });
 	};
}
export function getBookList() {
	return dispatch => {
	   HttpRequest.get('/api/book/bookList')
		.end(function(err,resp){
		   dispatch({
			 type: GET_BOOK_LIST,
			 data: resp.body
		   });
	   });
 	};
}
