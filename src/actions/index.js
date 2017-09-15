/**
 * Actiontypes
 */
import {
  CREATE_TASK,
  INITIALIZE,
  INITIALIZED,
  USER_LOGGED_IN,
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

export function userSignupRequest(userData) {
  return () => fetch('http://localhost:8080/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
}

export function userLoggedIn(user) {
  return { type: USER_LOGGED_IN, user };
}
