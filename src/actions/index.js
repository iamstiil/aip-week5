export const CREATE_TASK = 'CREATE_TASK';

export function createTask(task){
  return { type: CREATE_TASK, task };
}