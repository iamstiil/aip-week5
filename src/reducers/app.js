import { INITIALIZE, INITIALIZED } from '../actions/actionTypes';

const initialState = {
  loaded: false,
  loading: false,
};

function app(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE: {
      return { ...state, loading: true };
    }
    case INITIALIZED: {
      return { ...state, loading: false, loaded: true };
    }
    default: {
      return state;
    }
  }
}

export default app;
