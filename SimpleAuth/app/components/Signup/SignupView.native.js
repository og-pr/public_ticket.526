
import React, { Component } from 'react';
import { compose } from 'recompose'; // og.note: replaced by React Hooks
import { Keyboard, 
         Linking, 
        ScrollView, 
        StyleSheet, 
        Text, 
        TextInput, 
        TouchableHighlight, 
        TouchableOpacity, 
        View } from 'react-native';

import { withRouter, Link } from 'react-router-native'; // is for MOBILE

import { withFirebase } from '../../common/Firebase';
import * as ROUTES from '../../common/routes';

import Styles from '../../common/style';
import * as CONSTANTS from '../../common/constants';

const RE_ROUTE_LOGIN = <View><Link to={ROUTES.SIGNUP} underlayColor='#D3D3D3'><Text style={Styles.textRed}>{"\n"}{CONSTANTS.UX_LOGIN}</Text></Link></View> // works

const SignupPage = () => (
  <View style={Styles.header, Styles.textBlock}>
    <Text style={Styles.text}>{CONSTANTS.TEXT_CREATE_ACCOUNT}</Text>
    <SignupForm />
  </View>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'account-exists-with-different-credential';
const ERROR_MSG_ACCOUNT_EXISTS = 'An account already exists.';

var usernameOk = ''; /// let and const only accessible inside block created aka block scope. var accessible anywhere
var emailOk = '';
var passwordOneOk = '';
var passwordTwoOk = '';

class SignupFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  // ...
  
  checkError = (error) => {
    var uxError; // var so it can be read outside block

    if (error.code === CONSTANTS.FB_USER_NOT_FOUND) {
      uxError = 1
      return ( RE_ROUTE_LOGIN ) 
      } else {
      return ( <Text style={Styles.textRed}>{"\n"}{error.message}{"\n"}</Text> ) 
    }
  }

  checkInput = event => {

    /// catch all empty
    if (this.state.username.trim() === '' && this.state.email.trim() === '' && this.state.passwordOne.trim() === '' && this.state.passwordTwo.trim() === '') { 
      this.setState(() => ({ usernameError: "  ... Full Name required ... " }));
      this.setState(() => ({ emailError: "  ... Email required ... " }));
      this.setState(() => ({ passwordOneError: "  ... Password 1 required ... " }));
      this.setState(() => ({ passwordTwoError: "  ... Password 2 required ... " }));
      return;
    } 

    // catch one empty
    if (this.state.username.trim() === '') { 
      this.setState(() => ({ usernameError: "  ... Full Name required ... " }));
      return;
    } else {
      this.setState(() => ({ usernameError: null }));
      usernameOk = '1';
    }

    // catch one empty
    if (this.state.email.trim() === '') { 
      this.setState(() => ({ emailError: "  ... Email required ... " }));
      return;
    } else {
      this.setState(() => ({ emailError: null }));
      emailOk = '1';
    }

    // catch one empty
    if (this.state.passwordOne.trim() === '') { 
      this.setState(() => ({ passwordOneError: "  ... Password 1 required ... " }));
      return;
    } else {
      this.setState(() => ({ passwordOneError: null }));
      passwordOneOk = '1';
    }

    // catch one empty
    if (this.state.passwordTwo.trim() === '') { 
      this.setState(() => ({ passwordTwoError: "  ... Password 2 required ... " }));
      return;
    } else {
      this.setState(() => ({ passwordTwoError: null }));
      passwordTwoOk = '1';
    }

    // form validation BEFORE onSubmit
    if (usernameOk==='1') { console.log('o.log > username ok') }
    if (emailOk==='1') { console.log('o.log > email ok') }
    if (passwordOneOk==='1') { console.log('o.log > password 1 ok') }
    if (passwordTwoOk==='1') { console.log('o.log > password 2 ok') }
    if (usernameOk==='1' && emailOk==='1' && passwordOneOk==='1' && passwordTwoOk==='1') { console.log('o.log > all ok'); this.onSubmit(event); }
  }

  onSubmit = event => {
    const { username, email, passwordOne, passwordTwo } = this.state;

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

    //event.preventDefault(); // is WEB specific ; replaced with checkInput for MOBILE

  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
            <View style={Styles.formContainer}>

              <TextInput
                style={Styles.formInput}
                value={username}
                onChangeText={ (username) => this.setState( {username} ) }
                type="text"
                placeholder="Full Name"
                //autoCapitalize = 'none'
                maxLength={40}
                pattern=".*\S.*"
                />

                {!!this.state.usernameError && (
                  <View><Text style={Styles.textRed}>{this.state.usernameError}</Text></View>
                 )
                }

              <TextInput
                style={Styles.formInput}
                value={email}
                onChangeText={ (email) => this.setState( {email} ) }
                type="text"
                placeholder="Email Address"
                autoCapitalize = 'none'
                maxLength={40}
                pattern=".*\S.*"
                />

                {!!this.state.emailError && (
                  <View><Text style={Styles.textRed}>{this.state.emailError}</Text></View>
                 )
                }

              <TextInput
                style={Styles.formInput}
                value={passwordOne}
                onChangeText={ (passwordOne) => this.setState( {passwordOne} ) }
                type="password"
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                placeholder="Password"
                autoCapitalize = 'none'
                maxLength={40}
                pattern=".*\S.*"
              />

                {!!this.state.passwordOneError && (
                  <View><Text style={Styles.textRed}>{this.state.passwordOneError}</Text></View>
                 )
                }

              <TextInput
                style={Styles.formInput}
                value={passwordTwo}
                onChangeText={ (passwordTwo) => this.setState( {passwordTwo} ) }
                type="password"
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                placeholder="Password must match"
                autoCapitalize = 'none'
                maxLength={40}
                pattern=".*\S.*"
              />

                {!!this.state.passwordTwoError && (
                  <View><Text style={Styles.textRed}>{this.state.passwordTwoError}</Text></View>
                 )
                }

              <TouchableOpacity style={Styles.formButton} onPress={ () => { this.checkInput() } } >
                <View><Text style={Styles.formButtonText}>{CONSTANTS.TEXT_SIGNUP}</Text></View>
              </TouchableOpacity>

              <View><Link to={ROUTES.LOGIN} underlayColor='#D3D3D3'><Text style={Styles.textCenter}>{"\n"}{CONSTANTS.UX_LOGIN}</Text></Link></View>

              {!!this.state.error && (
                  <View style={Styles.textCenter}>{ this.checkError(this.state.error) }</View>
                )
              }

            </View>
    );
  }
}

const SignupForm = compose(
  withRouter,
  withFirebase,
)(SignupFormBase);

export default SignupPage
export { SignupForm }
