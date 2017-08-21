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
        id: 4,
        title: 'Task 1',
        description: 'Simple task description'
      },
      {
        id: 5,
        title: 'Task 2',
        description: 'Simple task description'
      },
      {
        id: 6,
        title: 'Task 3',
        description: 'Simple task description'
      },
      {
        id: 7,
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
        id: 8,
        title: 'Task 1',
        description: 'Simple task description'
      },
      {
        id: 9,
        title: 'Task 2',
        description: 'Simple task description'
      },
    ]
  },
];

function users(state = initialState, action) {
  return state;
}

export default users;