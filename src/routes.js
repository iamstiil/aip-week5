import App from './App';
import Dashboard from './components/Dashboard';
import Task from './components/Task';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import Signup from './components/Signup';
import Login from './components/Login';
import Administration from './components/Administration';

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
      path: '/admin',
      exact: true,
      component: requireAuth(Administration),
    },
    {
      path: '/task/create',
      exact: true,
      component: requireAuth(CreateTask),
    },
    {
      path: '/task/:taskid',
      exact: true,
      component: requireAuth(Task),
    },
    {
      path: '/task/:taskid/edit',
      exact: true,
      component: requireAuth(EditTask),
    },
  ],
}];

export default routes;
