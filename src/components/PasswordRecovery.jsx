import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import { passwordRecoveryRequest } from '../actions';
import InputGroup from './InputGroup';

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
      error: {},
      id: isIdValid ? id : null,
      password: '',
      passwordConfirm: '',
      submitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.passwordRecoveryRequest(
      this.state.id,
      this.state.password,
      this.state.passwordConfirm,
    ).then((res) => {
      console.log(res.json());
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
};

export default connect(
  null,
  dispatch => ({
    passwordRecoveryRequest: (id, password, passwordConfirm) => dispatch(
      passwordRecoveryRequest(id, password, passwordConfirm),
    ),
  }),
)(PasswordRecovery);

