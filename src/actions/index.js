/**
 * Actiontypes
 */
import * from './actionTypes';

/**
 * Action Creators
 */
export function createTask(task) {
  return { type: CREATE_TASK, task };
}
