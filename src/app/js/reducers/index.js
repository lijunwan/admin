import { combineReducers } from 'redux';
import clientReducer from './client';
// import bookInfoReducer from './book';
// import orderReducer from './order';
const rootReducer = combineReducers({
  client: clientReducer,
  // bookInfo: bookInfoReducer,
  // order: orderReducer,
});
export default rootReducer;