import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      if (!this.props.isAuthenticated) {
        return null;
      }
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  };

  return connect(state => ({
    isAuthenticated: state.app.isAuthenticated,
  }))(Authenticate);
}
