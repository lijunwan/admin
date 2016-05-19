import {GET_ORDER_LIST} from '../actions/order';
import Immutable from 'immutable';
const initialState = {
    'orderList': {},
}
export default function (state = Immutable.fromJS(initialState), action) {
	switch (action.type) {
		case GET_ORDER_LIST:
			return state.set('orderList',action.data);
		default:
			return state;
	}
}
