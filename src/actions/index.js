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
  USER_ROLE_CHANGE,
  USER_DELETE,
} from './actionTypes';

/**
 * Helper Functions
 */
function fetchUsers() {
  const token = localStorage.getItem('jwtToken');
  return fetch('http://localhost:8080/api/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json());
}

function fetchTasks() {
  const token = localStorage.getItem('jwtToken');
  return fetch('http://localhost:8080/api/task', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json());
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
  return () => fetch('http://localhost:8080/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
}

export function createTaskRequest(task) {
  const token = localStorage.getItem('jwtToken');
  return () => fetch('http://localhost:8080/api/task', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  });
}

export function userLoggedIn(token) {
  return (dispatch) => {
    dispatch({ type: USER_LOGGED_IN, token });
    fetchUsers().then((users) => {
      dispatch({ type: USERS_LOADED, users });
    });
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
  const token = localStorage.getItem('jwtToken');
  return () => fetch(`http://localhost:8080/api/task/${task.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  });
}

export function deleteTask(task) {
  return { type: DELETE_TASK, task };
}

export function deleteTaskRequest(task) {
  const token = localStorage.getItem('jwtToken');
  return () => fetch(`http://localhost:8080/api/task/${task.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
}

export function userRoleChangeRequest(user) {
  const token = localStorage.getItem('jwtToken');
  return () => fetch(`http://localhost:8080/api/user/${user.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}

export function userRoleChange(user) {
  return { type: USER_ROLE_CHANGE, user };
}

export function userDeleteRequest(user) {
  const token = localStorage.getItem('jwtToken');
  return () => fetch(`http://localhost:8080/api/user/${user.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}

export function userDelete(user) {
  return { type: USER_DELETE, user };
}

export function passwordResetRequest(email) {
  return () => fetch('http://localhost:8080/auth/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
}
