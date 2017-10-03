/**
 * Import dependencies
 */
import jwt from 'jsonwebtoken';
import { INITIALIZE, USER_LOGGED_IN, USER_LOGGED_OUT, USER_ROLE_CHANGE, CHANGE_TITLE } from '../actions/actionTypes';

/**
 * Initial state
 */
const initialState = {
  currentUser: null,
  isAuthenticated: false,
  title: 'Dashboard',
  token: null,
};

/**
 * Reducer for app
 */
function app(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE: {
      let user = null;
      let isAdmin = false;
      const token = localStorage.getItem('jwtToken');
      if (token) {
        user = jwt.decode(token);
        isAdmin = (user.role === 'Administrator');
      }
      return { ...state, currentUser: user, isAdmin, isAuthenticated: !!user };
    }
    case USER_LOGGED_IN: {
      localStorage.setItem('jwtToken', action.token);
      const user = jwt.decode(action.token);
      return { ...state, currentUser: user, isAdmin: (user.role === 'Administrator'), isAuthenticated: true, token: action.token };
    }
    case USER_LOGGED_OUT: {
      localStorage.removeItem('jwtToken');
      return { ...state, currentUser: null, isAuthenticated: false, token: null };
    }
    case USER_ROLE_CHANGE: {
      if (state.currentUser.id === action.user.id) {
        return { ...state, currentUser: action.user, isAdmin: (action.user.role === 'Administrator') };
      }
      return state;
    }
    case CHANGE_TITLE: {
      return { ...state, title: action.title };
    }
    default: {
      return state;
    }
  }
}

/**
 * Export
 */
export default app;
