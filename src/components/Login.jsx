/**
 * Import dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { userLoggedIn } from '../actions';
import { appUrl } from '../constants';
import InputGroup from './InputGroup';
import logo from '../homize_logo.png';

/**
 * Component class for Login
 */
class Login extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      formData: {
        email: '',
        password: '',
      },
      submitted: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Handle submit button click
   * TODO: Refactor
   */
  handleClick() {
    this.setState({
      error: {},
    });
    fetch(`http://${appUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then(response => response.json()).then((body) => {
      if (body.error) {
        this.setState({
          error: body.error,
        });
      } else {
        this.props.userLoggedIn(body.token);
        this.props.history.push('/');
      }
    });
  }

  /**
   * Handle form submit
   * TODO: Refactor
   */
  handleSubmit() {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
  }

  /**
   * Handle input field change
   */
  handleChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  render() {
    return (
      <div className="login-panel card mt-5">
        <img src={logo} alt="logo" />
        <div className="card-block p-3">
          <h3 className="card-title text-center mt-1">Login</h3>
          <div className="divider mt-0" />
          <form className="form">
            <InputGroup
              field="email"
              label="Email"
              onChange={this.handleChange}
              type="email"
              value={this.state.formData.email}
              error={this.state.error.email}
            />
            <InputGroup
              field="password"
              label="Password"
              onChange={this.handleChange}
              type="password"
              value={this.state.formData.password}
              error={this.state.error.password}
            />
            <Link to={'/password-reset'}>
              <div className="mb-3">
                <a href="#passwordReset">forgot password?</a>
              </div>
            </Link>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={this.handleClick}
            >Login</button>
          </form>
          <Link to={'/signup'}>
            <button
              type="button"
              className="btn btn-secondary btn-block mt-3"
            >SignUp</button>
          </Link>
        </div>
      </div>
    );
  }
}

/**
 * PropTypes
 */
Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  userLoggedIn: PropTypes.func.isRequired,
};

/**
 * Connect Redux with Component
 */
export default connect(
  null,
  dispatch => ({
    userLoggedIn: (token) => {
      dispatch(userLoggedIn(token));
    },
  }),
)(Login);
