import App from './App';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import PasswordReset from './components/PasswordReset';
import PasswordRecovery from './components/PasswordRecovery';
import Administration from './components/Administration';
import Settings from './components/Settings';
import CreateTask from './components/CreateTask';
import Task from './components/Task';
import EditTask from './components/EditTask';


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
      path: '/password-reset',
      exact: true,
      component: PasswordReset,
    },
    {
      path: '/password-recovery',
      exact: true,
      component: PasswordRecovery,
    },
    {
      path: '/admin',
      exact: true,
      component: requireAuth(Administration),
    },
    {
      path: '/settings',
      exact: true,
      component: requireAuth(Settings),
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
