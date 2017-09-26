/**
 * Import dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import { userLoggedIn } from '../actions';
import './Login.scss';

/**
 * Inline styles
 */
const style = {
  margin: 15,
};

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
      formData: {
        email: '',
        password: '',
      },
      submitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Handle submit button click
   * TODO: Refactor
   */
  handleClick() {
    fetch('http://localhost:8080/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then(response => response.json()).then((body) => {
      if (body.error) {
        if (body.error.email) {
          // TODO display error when email not valid
          console.log(body.error.email);
        } else if (body.error.password) {
        // TODO display error when password not valid
          console.log(body.error.password);
        }
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
      <div className="row content-wrapper login-wrapper">
        <MuiThemeProvider>
          <div>
            <ValidatorForm
              onSubmit={this.handleSubmit}
            >
              <TextValidator
                hintText="Enter your Email address"
                floatingLabelText="Email"
                name="email"
                value={this.state.formData.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                onChange={this.handleChange}
              />
              <br />
              <TextValidator
                type="password"
                name="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                value={this.state.formData.password}
                validators={['required']}
                errorMessages={['this field is required']}
                onChange={this.handleChange}
              />
              <br />
              <RaisedButton
                label="Submit"
                primary
                style={style}
                onClick={event => this.handleClick(event)}
              />
            </ValidatorForm>
          </div>
        </MuiThemeProvider>
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
