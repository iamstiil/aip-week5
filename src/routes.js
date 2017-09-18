import App from './App';
import Dashboard from './components/Dashboard';
import Task from './components/Task';
import CreateTask from './components/CreateTask';
import Signup from './components/Signup';
import Login from './components/Login';

import requireAuth from './utils/requireAuth';

const routes = [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: requireAuth(Dashboard),
    },
    {
      path: '/signup',
      exact: true,
      component: Signup,
    },
    {
      path: '/login',
      exact: true,
      component: Login,
    },
    {
      path: '/task/create',
      exact: true,
      component: requireAuth(CreateTask),
    },
    {
      path: '/task/:taskid(\\d+)',
      exact: true,
      component: requireAuth(Task),
    },
  ],
}];

export default routes;
