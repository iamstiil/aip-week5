import { CREATE_TASK } from '../actions';
const initialState = [
  {
    id: 1,
    name: 'User 1',
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Simple task description'
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Simple task description'
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Simple task description'
      },
    ]
  },
  {
    id: 2,
    name: 'User 2',
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Simple task description'
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Simple task description'
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Simple task description'
      },
      {
        id: 4,
        title: 'Task 4',
        description: 'Simple task description'
      },
    ]
  },
  {
    id: 3,
    name: 'User 3',
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Simple task description'
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Simple task description'
      },
    ]
  },
];

function users(state = initialState, action) {
  switch(action.type){
    case CREATE_TASK:
      let res = state.map((user) => {
        if(user.id == action.task.user){
          let id = Math.max.apply(null, user.tasks.map((task) => {
            return task.id;
          })) || -1;
          
          user.tasks.push({
            id: id + 1,
            title: action.task.title,
            description: action.task.description
          });
        }
        return user;
      });
      return res;
    default:
      return state;
  }
}

export default users;