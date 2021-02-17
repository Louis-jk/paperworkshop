import {combineReducers} from 'redux';
import OrderReducer from './OrderReducer';
import InfoReducer from './InfoReducer';

const rootReducer = combineReducers({
  OrderReducer,
  InfoReducer,
});

export default rootReducer;
