import {GET_BOOK_TYPE, ADD_BOOK} from '../actions/book';
import Immutable from 'immutable';
export default function (state = Immutable.fromJS({bookMenu:{},bookInfo:{}}), action) {
	switch (action.type) {
		case GET_BOOK_TYPE:
			return state.set('bookMenu',action.data);
		case ADD_BOOK:
			return state.set('bookInfo',action.data);
		default:
			return state;
	}
}
