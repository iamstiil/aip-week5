/**
 * Actiontypes
 */
import {
  CREATE_TASK,
  EDIT_TASK,
  DELETE_TASK,
  INITIALIZE,
  USER_LOGGED_IN,
  USERS_LOADED,
  TASKS_LOADED,
  USER_LOGGED_OUT,
} from './actionTypes';

/**
 * Helper Functions
 */
function fetchUsers() {
  return fetch('http://localhost:8080/api/user').then(response => response.json());
}

function fetchTasks() {
  return fetch('http://localhost:8080/api/task').then(response => response.json());
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
      fetchTasks().then((tasks) => {
        dispatch({ type: TASKS_LOADED, tasks });
      });
    }
  };
}

export function userSignupRequest(userData) {
  // TODO: Refactor into reducer users
  return () => fetch('http://localhost:8080/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
}

export function createTaskRequest(task) {
  return () => fetch('http://localhost:8080/api/task', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
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

export function editTask(task) {
  return { type: EDIT_TASK, task };
}

export function editTaskRequest(task) {
  return () => fetch(`http://localhost:8080/api/task/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  });
}

export function deleteTask(task) {
  return { type: DELETE_TASK, task };
}

export function deleteTaskRequest(task) {
  return () => fetch(`http://localhost:8080/api/task/${task.id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });
}
