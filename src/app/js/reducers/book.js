import {GET_BOOK_TYPE, ADD_BOOK, GET_BOOK_LIST, GET_BOOK_INFO} from '../actions/book';
import Immutable from 'immutable';
export default function (state = Immutable.fromJS({bookMenu:{},bookInfo:{}, bookList: {}, bookDetail: {}}), action) {
	switch (action.type) {
		case GET_BOOK_TYPE:
			return state.set('bookMenu',action.data);
		case ADD_BOOK:
			return state.set('bookInfo',action.data);
		case GET_BOOK_LIST:
			return state.set('bookList', action.data);
		case GET_BOOK_INFO:
			return state.set('bookDetail', action.data);
		default:
			return state;
	}
}
