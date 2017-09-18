import jwt from 'jsonwebtoken';
import { INITIALIZE, INITIALIZED, USER_LOGGED_IN } from '../actions/actionTypes';

const initialState = {
  loaded: false,
  loading: false,
  currentUser: null,
  isAuthenticated: false,
};

function app(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE: {
      return { ...state, loading: true };
    }
    case INITIALIZED: {
      return { ...state, loading: false, loaded: true };
    }
    case USER_LOGGED_IN: {
      localStorage.setItem('jwtToken', action.token);
      const user = jwt.decode(action.token);
      return { ...state, currentUser: user, isAuthenticated: true, token: action.token };
    }
    default: {
      return state;
    }
  }
}

export default app;
