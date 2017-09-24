/**
 * Actiontypes
 */
import {
  CREATE_TASK,
  INITIALIZE,
  USER_LOGGED_IN,
  USERS_LOADED,
  USER_LOGGED_OUT,
} from './actionTypes';

/**
 * Helper Functions
 */
function fetchUsers() {
  return fetch('http://localhost:8080/api/user').then(response => response.json());
}

/**
 * Action Creators
 */
export function createTask(task) {
  return { type: CREATE_TASK, task };
}

export function initializeApp() {
  return (dispatch) => {
    dispatch({ type: INITIALIZE });
    if (localStorage.getItem('jwtToken')) {
      fetchUsers().then((users) => {
        dispatch({ type: USERS_LOADED, users });
      });
    }
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
    fetchUsers().then((users) => {
      dispatch({ type: USERS_LOADED, users });
    });
    dispatch({ type: USER_LOGGED_IN, token });
  };
}

export function userLoggedOut() {
  return (dispatch) => {
    dispatch({ type: USER_LOGGED_OUT });
  };
}
