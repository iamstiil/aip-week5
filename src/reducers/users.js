const initialState = [
  {
    id: 1,
    name: 'User 1',
  },
  {
    id: 2,
    name: 'User 2',
  },
  {
    id: 3,
    name: 'User 3',
  },
];

function users(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default users;
