/**
 * Actiontypes
 */
export const CREATE_TASK = 'CREATE_TASK';

/**
 * Action Creators
 */
export function createTask(task) {
  return { type: CREATE_TASK, task };
}
