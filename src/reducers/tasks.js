/**
 * Import dependencies
 */
import { CREATE_TASK } from '../actions/actionTypes';


/**
 * Reducer for tasks
 */
function tasks(state = [], action) {
  switch (action.type) {
    case CREATE_TASK: {
      const res = state.slice(0);
      res.push(action.task);
      return res;
    }
    default: {
      return state;
    }
  }
}

/**
 * Export
 */
export default tasks;
