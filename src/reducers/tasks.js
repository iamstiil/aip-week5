import { CREATE_TASK } from '../actions/actionTypes';

function tasks(state = [], action) {
  switch (action.type) {
    case CREATE_TASK: {
      const res = state.slice(0);

      const id = Math.max.apply(null, state.map(task => task.id)) || -1;

      res.push({
        id: id + 1,
        title: action.task.title,
        description: action.task.description,
        userid: action.task.user,
      });

      return res;
    }
    default: {
      return state;
    }
  }
}

export default tasks;
