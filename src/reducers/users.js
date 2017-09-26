/**
 * Import dependencies
 */
import { USERS_LOADED } from '../actions/actionTypes';

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
          username: user.username,
        });
        return true;
      });
      return res;
    }
    default:
      return state;
  }
}

/**
 * Export
 */
export default users;
