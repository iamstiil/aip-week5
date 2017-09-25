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
const App = ({ handleLogout, history, isAuthenticated, route }) => (
  <div className="container-fluid">
    <div className="row">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to={'/'}>Homize</Link>
        <div className="collapse navbar-collapse" id="main-menu">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            { isAuthenticated && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="Open Menu" height={28} />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item">Settings</a>
                  <a className="dropdown-item" role="link" tabIndex={0} onClick={() => { handleLogout(); history.push('/login'); }}>
                    Logout
                  </a>
                </div>
              </li>
            )}
            { !isAuthenticated && (
              <Link className="nav-link" to={'/'}>SignUp</Link>
            )}
          </ul>
        </div>
      </nav>
    </div>
    {renderRoutes(route.routes)}
  </div>
);

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  route: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    isAuthenticated: state.app.isAuthenticated,
  }),
  dispatch => ({
    handleLogout: () => dispatch(userLoggedOut()),
  }),
)(App);
