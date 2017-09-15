import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import 'bootstrap';
import './App.scss';

/**
 * Component class for routing
 */
const App = ({ route }) => (
  <div className="container-fluid">
    <div className="row">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to={'/'}>Homize</Link>
      </nav>
    </div>
    {renderRoutes(route.routes)}
  </div>
);

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  route: PropTypes.object.isRequired,
};

export default App;
