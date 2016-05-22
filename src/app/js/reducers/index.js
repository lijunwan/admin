import { combineReducers } from 'redux';
import clientReducer from './client';
import bookReducer from './book';
import orderReducer from './order';
const rootReducer = combineReducers({
  client: clientReducer,
  book: bookReducer,
  order: orderReducer,
});
export default rootReducer;
