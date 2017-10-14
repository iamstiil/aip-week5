import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import { passwordResetRequest } from '../actions';
import InputGroup from './InputGroup';

/**
 * Component for resetting the Password
 */
class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      email: '',
      submitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: {} });
    this.props.passwordResetRequest(this.state.email).then(res => res.json()).then((res) => {
      if (res.error) {
        this.setState({ error: { default: res.error } });
      } else {
        this.setState({ msg: 'Password reset was requested. Email was sent to your mailbox.' });
        setTimeout(() => {
          this.props.history.push('/');
        }, 3000);
      }
    });
  }
  handleChange(e) {
    this.setState({ email: e.target.value });
  }

  render() {
    return (
      <div className="login-panel card mt-5">
        <div className="card-block p-3">
          <h3 className="card-title text-center mt-1">Password Reset</h3>
          <div className="divider mt-0" />
          <form className="form" onSubmit={this.handleSubmit}>
            <InputGroup
              field="email"
              label="Email"
              onChange={this.handleChange}
              type="email"
              value={this.state.email}
              required
            />
            <button
              className="btn btn-primary btn-block mb-3"
            >Reset</button>
            {this.state.error.default && (
              <div className="alert alert-danger" role="alert">{this.state.error.default}</div>
            )}
            {this.state.msg && (
              <div className="alert alert-success" role="alert">{this.state.msg}</div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

/**
 * PropTypes
 */
PasswordReset.propTypes = {
  passwordResetRequest: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default connect(
  null,
  dispatch => ({
    passwordResetRequest: email => dispatch(passwordResetRequest(email)),
  }),
)(PasswordReset);

