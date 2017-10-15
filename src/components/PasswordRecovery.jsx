import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import { passwordRecoveryRequest } from '../actions';
import InputGroup from './InputGroup';
import validations from '../shared/validations';

/**
 * Component for setting new password
 */
class PasswordRecovery extends Component {
  constructor(props) {
    super(props);
    let id;
    if (props.location.search) {
      id = props.location.search.substring(1);
    }
    const isIdValid = new RegExp('^[a-f0-9]{24}$').test(id);
    this.state = {
      errors: {},
      id: isIdValid ? id : null,
      password: '',
      confirmPassword: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    const userData = {
      id: this.state.id,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    if (this.isValid(userData)) {
      this.props.passwordRecoveryRequest(userData).then(res => res.json()).then((res) => {
        if (res.error) {
          this.setState({ errors: { default: res.error } });
        } else {
          this.setState({ msg: 'Password recovery was successful. You will be redirected...' });
          setTimeout(() => {
            this.props.history.push('/');
          }, 3000);
        }
      });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Check if form fields are valid
   */
  isValid(userData) {
    const { errors, isValid } = validations.validatePassword(userData);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    return (
      <div className="login-panel card mt-5">
        {this.state.id && (
          <div className="card-block p-3">
            <h3 className="card-title text-center mt-1">Password Recovery</h3>
            <div className="divider mt-0" />
            <form className="form" onSubmit={this.handleSubmit}>
              <input type="text" name="id" value={this.state.id} hidden />
              <InputGroup
                error={this.state.errors.password}
                field="password"
                label="New Password"
                onChange={this.handleChange}
                type="password"
                value={this.state.password}
                required
              />
              <InputGroup
                error={this.state.errors.confirmPassword}
                field="confirmPassword"
                label="Confirm new Password"
                onChange={this.handleChange}
                type="password"
                value={this.state.confirmPassword}
                required
              />
              <button
                className="btn btn-primary btn-block mb-3"
              >Submit</button>
              {this.state.errors.default && (
                <div className="alert alert-danger" role="alert">{this.state.errors.default}</div>
              )}
              {this.state.msg && (
                <div className="alert alert-success" role="alert">{this.state.msg}</div>
              )}
            </form>
          </div>
        )}
        {!this.state.id && (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="error-template text-center">
                  <h1>Oops!</h1>
                  <h2>404 Not Found</h2>
                  <div className="error-details">
                    <p>Sorry, an error has occured, Requested page not found!</p>
                  </div>
                  <div className="error-actions">
                    <a href="/" className="btn btn-primary btn-lg">
                      <span className="glyphicon glyphicon-home" />
                      Take Me Home
                    </a>
                    <a href="http://www.jquery2dotnet.com" className="btn btn-default btn-lg">
                      <span className="glyphicon glyphicon-envelope" /> Contact Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

/**
 * PropTypes
 */
PasswordRecovery.propTypes = {
  passwordRecoveryRequest: PropTypes.func.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default connect(
  null,
  dispatch => ({
    passwordRecoveryRequest: data => dispatch(
      passwordRecoveryRequest(data),
    ),
  }),
)(PasswordRecovery);

