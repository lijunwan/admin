import {GET_BOOK_TYPE} from '../actions/book';
import Immutable from 'immutable';
export default function (state = Immutable.fromJS({bookMenu:{}}), action) {
	switch (action.type) {
		case GET_BOOK_TYPE:
			return state.set('bookMenu',action.data);
		default:
			return state;
	}
}