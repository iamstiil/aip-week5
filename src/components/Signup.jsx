/**
 * Import dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { userSignupRequest } from '../actions';
import InputGroup from './InputGroup';
import validations from '../shared/validations';

/**
 * Component class for SignUp
 */
class SignUp extends Component {
  /**
   * Constructor
   */
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

  /**
   * Handle changes on inputs
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Handle form submission
   */
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

  /**
   * Check if form fields are valid
   */
  isValid(userData) {
    const { errors, isValid } = validations.validateSignupInput(userData);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    return (
      <div className="login-panel card mt-5">
        <div className="card-block p-3">
          <h3 className="card-title text-center mt-1">Sign Up</h3>
          <div className="divider mt-0" />
          <form className="form" onSubmit={this.onSubmit}>
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
          <Link to={'/login'}>
            <button
              type="button"
              className="btn btn-secondary btn-block mt-3"
            >Login</button>
          </Link>
        </div>
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
