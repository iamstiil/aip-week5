import { USERS_LOADED } from '../actions/actionTypes';

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

export default users;
