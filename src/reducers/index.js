import { combineReducers } from 'redux';
import users from './users';

const combinedReducers = combineReducers({
  users: users
});

export default combinedReducers;