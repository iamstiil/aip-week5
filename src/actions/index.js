/**
 * Actiontypes
 */
import {
  CREATE_TASK,
  INITIALIZE,
  USER_LOGGED_IN,
  USERS_LOADED,
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

export function userLoggedIn(token) {
  return (dispatch) => {
    fetch('http://localhost:8080/api/user').then(response => response.json()).then((body) => {
      dispatch({ type: USERS_LOADED, body });
    });
    dispatch({ type: USER_LOGGED_IN, token });
  };
}
