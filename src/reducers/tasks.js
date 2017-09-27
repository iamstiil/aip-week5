/**
 * Import dependencies
 */
import { CREATE_TASK, EDIT_TASK, TASKS_LOADED } from '../actions/actionTypes';


/**
 * Reducer for tasks
 */
function tasks(state = [], action) {
  switch (action.type) {
    case TASKS_LOADED: {
      const res = [];
      action.tasks.map((task) => {
        res.push({
          id: task.id,
          title: task.title,
          description: task.description,
          user: task.user,
        });
        return true;
      });
      return res;
    }
    case CREATE_TASK: {
      const res = state.slice(0);
      res.push(action.task);
      return res;
    }
    case EDIT_TASK: {
      const res = state.slice(0).map((task) => {
        if (task.id === action.task.id) {
          return {
            ...task,
            description: action.task.description,
            title: action.task.title,
            user: action.task.user,
          };
        }
        return task;
      });
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
