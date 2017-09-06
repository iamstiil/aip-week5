import { combineReducers } from 'redux';
import users from './users';
import tasks from './tasks';

const combinedReducers = combineReducers({
  users,
  tasks,
});

export default combinedReducers;
