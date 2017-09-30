import 'bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { userLoggedOut } from './actions';

import './App.scss';

/**
 * Component class for routing
 */
const App = ({ handleLogout, history, isAdmin, isAuthenticated, route }) => (
  <div className="container-fluid" id="wrapper">
    {isAuthenticated && (
      <div className="row">
        <nav className="sidebar col-xs-12 col-sm-4 col-lg-3 col-xl-2 bg-faded sidebar-style-1">
          <h1 className="site-title">Homize</h1>
          <a href="#menu-toggle" className="btn btn-default" id="menu-toggle">
            <em className="oi oi-menu" />
          </a>
          <ul className="nav nav-pills flex-column sidebar-nav">
            <li className="nav-item">
              <a href="#dasboard" className="nav-link">
                <em className="oi oi-dashboard" />Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a href="#dasboard" className="nav-link">
                <em className="oi oi-key" />Rooms
              </a>
            </li>
            <li className="nav-item">
              <a href="#dasboard" className="nav-link">
                <em className="oi oi-list" />Categories
              </a>
            </li>
            <li className="nav-item">
              <a href="#dasboard" className="nav-link">
                <em className="oi oi-badge" />Hall of Fame
              </a>
            </li>
          </ul>
        </nav>
        <main className="col-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
          <header className="page-header row justify-center">
            <div className="col-md-6 col-lg-8">
              <h1 className="float-left text-center text-md-left">Dashboard</h1>
            </div>
            <div
              className="dropdown user-dropdown col-md-6 col-lg-4 text-center text-md-right"
            >
              <a
                className="btn btn-stripped dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  className="circle float-left profile-photo"
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                  alt="Open Menu"
                  height={50}
                />
                <div className="username mt-1">
                  <h4 className="mb-1">Username</h4>
                  <h6 className="text-muted">Admin</h6>
                </div>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a className="dropdown-item" href="#settings">Settings</a>
                <a
                  className="dropdown-item"
                  href="#logout"
                  onClick={(event) => {
                    event.preventDefault();
                    handleLogout(); history.push('/login');
                  }}
                >Logout</a>
                {isAdmin && [
                  <div className="dropdown-divider" key={1} />,
                  <Link className="dropdown-item" key={2} to={'/admin'}>Administration</Link>,
                ]}
              </div>
            </div>
          </header>
          {renderRoutes(route.routes)}
        </main>
      </div>
    )}
    {!isAuthenticated && (
      <div className="row">
        <main className="col-10 col-sm-8 col-md-4 m-auto">
          {renderRoutes(route.routes)}
        </main>
      </div>
    )}
  </div>
);

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  route: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    isAuthenticated: state.app.isAuthenticated,
    isAdmin: state.app.isAdmin,
  }),
  dispatch => ({
    handleLogout: () => dispatch(userLoggedOut()),
  }),
)(App);
