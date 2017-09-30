/**
 * Import dependencies
 */
import jwt from 'jsonwebtoken';
import { INITIALIZE, USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/actionTypes';

/**
 * Initial state
 */
const initialState = {
  currentUser: null,
  isAuthenticated: false,
  token: null,
};

/**
 * Reducer for app
 */
function app(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE: {
      let user = null;
      const token = localStorage.getItem('jwtToken');
      if (token) {
        user = jwt.decode(token);
      }
      return { ...state, currentUser: user, isAdmin: (user.role === 'Administrator'), isAuthenticated: !!user };
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
    default: {
      return state;
    }
  }
}

/**
 * Export
 */
export default app;
