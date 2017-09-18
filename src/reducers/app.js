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
      return { ...state, currentUser: action.user, isAuthenticated: true };
    }
    default: {
      return state;
    }
  }
}

export default app;
