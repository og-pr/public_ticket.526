import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../common/Firebase';
import * as ROUTES from '../../common/routes';
import * as ROLES from '../../common/roles';
import * as CONSTANTS from '../../common/constants';
   
const SignupPage = () => (
  <div className='container'>
    <h2>Signup</h2>
    <SignupForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
const ERROR_MSG_ACCOUNT_EXISTS = 'Account already exists.';

class SignupFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form className="formContainer" onSubmit={this.onSubmit}>

        <input
          name="username"
          required
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
          pattern=".*\S.*"
          size='32'
         />

        <input
          name="email"
          required
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Email Address"
          pattern=".*\S.*"
         />

        <input
          name="passwordOne"
          required
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          pattern=".*\S.*"
         />

        <input
          name="passwordTwo"
          required
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
          pattern=".*\S.*"
         />

        <button className="formButton formButtonText" type="submit">
          {CONSTANTS.TEXT_SIGNUP}
        </button>

        <p>Already have an account, <Link to={ROUTES.LOGIN}>Login</Link></p>

         <span className='textRed'>{error && <p>{error.message}</p>}</span>
      </form>
    );
  }
}

const SignupForm = compose(
  withRouter,
  withFirebase,
)(SignupFormBase);

export default SignupPage;

export { SignupForm };
