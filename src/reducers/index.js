import { combineReducers } from 'redux';
import app from './app';
import users from './users';
import tasks from './tasks';

const combinedReducers = combineReducers({
  app,
  users,
  tasks,
});

export default combinedReducers;
