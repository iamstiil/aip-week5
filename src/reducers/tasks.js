import { CREATE_TASK } from '../actions';
const initialState = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Simple task description',
    userid: 1,
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Simple task description',
    userid: 2,
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Simple task description',
    userid: 3,
  },
];

function users(state = initialState, action) {
  switch(action.type){
    case CREATE_TASK:
      let res = state.slice(0);
      
      let id = Math.max.apply(null, state.map((task) => {
        return task.id;
      })) || -1;
          
      res.push({
        id: id + 1,
        title: action.task.title,
        description: action.task.description,
        userid: action.task.user,
      });
      
      return res;
    default:
      return state;
  }
}

export default users;