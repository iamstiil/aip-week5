import { USERS_LOADED } from '../actions/actionTypes';

function users(state = [], action) {
  switch (action.type) {
    case USERS_LOADED: {
      const res = [];
      action.body.map((user) => {
        res.push({
          id: user._id, // eslint-disable-line no-underscore-dangle
          name: user.name,
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
