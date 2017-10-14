import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { passwordResetRequest } from '../actions';
import InputGroup from './InputGroup';

/**
 * Component for setting new password
 */
class PasswordRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      password: '',
      passwordConfirm: '',
      submitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.passwordResetRequest(this.state.email).then((res) => {
      console.log(res.json());
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="login-panel card mt-5">
        <div className="card-block p-3">
          <h3 className="card-title text-center mt-1">Password Recovery</h3>
          <div className="divider mt-0" />
          <form className="form" onSubmit={this.handleSubmit}>
            <InputGroup
              field="password"
              label="New Password"
              onChange={this.handleChange}
              type="password"
              value={this.state.password}
              required
            />
            <InputGroup
              field="passwordConfirm"
              label="Confirm new Password"
              onChange={this.handleChange}
              type="password"
              value={this.state.passwordConfirm}
              required
            />
            <button
              className="btn btn-primary btn-block"
            >Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

/**
 * PropTypes
 */
PasswordRecovery.propTypes = {
  passwordResetRequest: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    passwordResetRequest: email => dispatch(passwordResetRequest(email)),
  }),
)(PasswordRecovery);

