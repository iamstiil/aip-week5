import App from './App';
import Dashboard from './components/Dashboard';
import Task from './components/Task';
import CreateTask from './components/CreateTask';

const routes = [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Dashboard,
    },
    {
      path: '/task/create',
      exact: true,
      component: CreateTask,
    },
    {
      path: '/task/:taskid(\\d+)',
      exact: true,
      component: Task,
    },
  ],
}];

export default routes;
