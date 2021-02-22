import {combineReducers} from 'redux';
import OrderReducer from './OrderReducer';
import OrderHandlerReducer from './OrderHandlerReducer';
import InfoReducer from './InfoReducer';
import JoinReducer from './JoinReducer';
import UserInfoReducer from './UserInfoReducer';

const rootReducer = combineReducers({
  OrderReducer,
  OrderHandlerReducer,
  InfoReducer,
  JoinReducer,
  UserInfoReducer,
});

export default rootReducer;
