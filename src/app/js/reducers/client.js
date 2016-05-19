import {CHECK_LOGIN,
        GET_USER_LIST} from '../actions/client';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({info: {},userList: {}}), action) {
  switch (action.type) {
  case CHECK_LOGIN:
    return state.set("info", action.data);
  case GET_USER_LIST:
    return state.set("userList", action.data);
  default:
    return state;
  }
}
