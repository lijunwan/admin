import {GET_ORDER_LIST,GET_ORDER_INFO,GET_UNSEND_ORDER, GET_ORDER_STATIS} from '../actions/order';
import Immutable from 'immutable';
const initialState = {
    'orderList': {},
    'orderInfo':{},
    'unsendOrder': {},
    'orderStatistics':{},
}
export default function (state = Immutable.fromJS(initialState), action) {
	switch (action.type) {
		case GET_ORDER_LIST:
			return state.set('orderList',action.data);
        case GET_ORDER_INFO:
			return state.set('orderInfo',action.data);
        case GET_UNSEND_ORDER:
            return state.set('unsendOrder', action.data);
        case GET_ORDER_STATIS:
        	console.log(action.data, '---?123')
        	return state.set('orderStatistics',action.data);
		default:
			return state;
	}
}
