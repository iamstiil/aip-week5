/**
 * Import dependencies
 */
import { USERS_LOADED, USER_ROLE_CHANGE, USER_DELETE } from '../actions/actionTypes';

/**
 * Reducer for users
 */
function users(state = [], action) {
  switch (action.type) {
    case USERS_LOADED: {
      const res = [];
      action.users.map((user) => {
        res.push({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          username: user.username,
        });
        return true;
      });
      return res;
    }
    case USER_ROLE_CHANGE: {
      return state.map((user) => {
        if (user.id === action.user.id) {
          return {
            ...user,
            role: action.user.role,
          };
        }
        return user;
      });
    }
    case USER_DELETE: {
      return state.filter((user) => {
        if (user.id === action.user.id) {
          return false;
        }
        return true;
      });
    }
    default:
      return state;
  }
}

/**
 * Export
 */
export default users;
