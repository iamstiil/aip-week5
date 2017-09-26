/**
 * Import dependencies
 */
import { combineReducers } from 'redux';
import app from './app';
import users from './users';
import tasks from './tasks';

/**
 * Combine Reducers
 */
const combinedReducers = combineReducers({
  app,
  users,
  tasks,
});

/**
 * Export
 */
export default combinedReducers;
