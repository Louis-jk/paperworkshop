import {combineReducers} from 'redux';
import OrderReducer from './OrderReducer';
import InfoReducer from './InfoReducer';
import JoinReducer from './JoinReducer';
import UserInfoReducer from './UserInfoReducer';

const rootReducer = combineReducers({
  OrderReducer,
  InfoReducer,
  JoinReducer,
  UserInfoReducer,
});

export default rootReducer;
