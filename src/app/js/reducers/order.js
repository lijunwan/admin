import {GET_ORDER_LIST,GET_ORDER_INFO} from '../actions/order';
import Immutable from 'immutable';
const initialState = {
    'orderList': {},
    'orderInfo':{},
}
export default function (state = Immutable.fromJS(initialState), action) {
	switch (action.type) {
		case GET_ORDER_LIST:
			return state.set('orderList',action.data);
        case GET_ORDER_INFO:
			return state.set('orderInfo',action.data);
		default:
			return state;
	}
}
