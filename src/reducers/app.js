import jwt from 'jsonwebtoken';
import { INITIALIZE, USER_LOGGED_IN } from '../actions/actionTypes';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
};

function app(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE: {
      let user = null;
      const token = localStorage.getItem('jwtToken');
      if (token) {
        user = jwt.decode(token);
      }
      return { ...state, currentUser: user, isAuthenticated: !!user };
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
