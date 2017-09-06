/**
 * Actiontypes
 */
import {
  CREATE_TASK,
  INITIALIZE,
  INITIALIZED,
} from './actionTypes';

/**
 * Action Creators
 */
export function createTask(task) {
  return { type: CREATE_TASK, task };
}

export function initializeApp() {
  return (dispatch) => {
    dispatch({ type: INITIALIZE });

    fetch('http://localhost:8080/api/user').then(response => response.json()).then((body) => {
      dispatch({ type: INITIALIZED, body });
    });
  };
}
