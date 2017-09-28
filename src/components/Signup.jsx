/**
 * Import dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions';
import validations from '../shared/validations';
import InputGroup from './InputGroup';

/**
 * Component class for SignUp
 */
class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmPassword: '',
      email: '',
      errors: {},
      isLoading: false,
      password: '',
      username: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      confirmPassword: this.state.confirmPassword,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };
    if (this.isValid(userData)) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(userData).then((response) => {
        if (response.status === 200) {
          response.json().then(({ success }) => {
            if (success) {
              this.props.history.push('/');
            }
          });
        } else if (response.status === 400) {
          response.json().then((errors) => {
            this.setState({ errors, isLoading: false });
          });
        }
      });
    }
  }

  isValid(userData) {
    const { errors, isValid } = validations.validateSignupInput(userData);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    return (
      <div className="row">
        <form className="col-4 col-auto mr-auto ml-auto" onSubmit={this.onSubmit}>
          <InputGroup
            error={this.state.errors.email}
            field="email"
            label="Email address"
            onChange={this.onChange}
            type="email"
            value={this.state.email}
          />
          <InputGroup
            error={this.state.errors.username}
            field="username"
            label="Username"
            onChange={this.onChange}
            type="text"
            value={this.state.username}
          />
          <InputGroup
            error={this.state.errors.password}
            field="password"
            label="Password"
            onChange={this.onChange}
            type="password"
            value={this.state.password}
          />
          <InputGroup
            error={this.state.errors.confirmPassword}
            field="confirmPassword"
            label="Confirm Password"
            onChange={this.onChange}
            type="password"
            value={this.state.confirmPassword}
          />
          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={this.state.isLoading}
            >Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

/**
 * PropTypes
 */
SignUp.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  userSignupRequest: PropTypes.func.isRequired,
};

/**
 * Connect Redux with Component
 */
export default connect(
  null,
  { userSignupRequest },
)(SignUp);
