import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose'; // og.note: replaced by React Hooks

import { withFirebase } from '../../common/Firebase';
import * as ROUTES from '../../common/routes';
import * as CONSTANTS from '../../common/constants';

const LoginPage = () => (
  <div className="container">
    <h2>{CONSTANTS.TEXT_PLEASE}</h2>
    <LoginForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = `account-exists-with-different-credential`;

const ERROR_MSG_ACCOUNT_EXISTS = `An account already exists.`;

class LoginFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password) 
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form className="formContainer" onSubmit={this.onSubmit}>

        <input
          name="email"
          required
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          pattern=".*\S.*" // note: could be upgraded via refactor to [a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$
        />
        
        <input
          name="password"
          required
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          pattern=".*\S.*"
        />

        <button className="formButton formButtonText" type="submit">
          {CONSTANTS.TEXT_LOGIN}
        </button>

        <p className='textCenter'>{CONSTANTS.UX_SIGNUP_WEB}<Link to={ROUTES.SIGNUP}>{CONSTANTS.TEXT_REGISTER}</Link></p>

        <span className='textRed'>{error && <p>{error.message}</p>}</span>
      </form>
    );
  }
}

const LoginForm = compose(
  withRouter,
  withFirebase,
)(LoginFormBase);

export default LoginPage;

export { LoginForm };
