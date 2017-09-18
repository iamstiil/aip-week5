import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.scss';
import combinedReducers from './reducers';
import { initializeApp } from './actions';
import registerServiceWorker from './registerServiceWorker';
import routes from './routes';
import Login from './components/Login';


/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(thunk)),
);
/* eslint-enable */

store.dispatch(initializeApp());

ReactDOM.render(
  <Provider store={store}>
    <Router>{ store.currentUser ? renderRoutes(routes) : (
      <Route path="/" component={Login} />
    ) }</Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
