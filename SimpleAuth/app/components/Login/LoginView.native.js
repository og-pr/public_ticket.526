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

const RE_ROUTE_SIGNUP = <View><Text style={Styles.textRed}>{CONSTANTS.UX_USER_NOT_FOUND}</Text></View> // works

const LoginPage = () => ( 
  <View style={Styles.header, Styles.textBlock}>
    <Text style={Styles.text}>{CONSTANTS.TEXT_PLEASE}</Text>
    <LoginForm />
  </View>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = `account-exists-with-different-credential`;
const ERROR_MSG_ACCOUNT_EXISTS = `An account already exists.`;

var emailOk = ''; /// og.note: used for (minor) form validation and error checking 
var passwordOk = ''; /// let or const only accessible inside block created aka block scope. var accessible anywhere

class LoginFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  
  checkError = (error) => {
    var uxError; // var so it can be read outside block
    if (error.code === CONSTANTS.FB_USER_NOT_FOUND) {
      uxError = 1
      console.log(uxError)
      return ( RE_ROUTE_SIGNUP ) 
    } else {
      return ( <Text style={Styles.textRed}>{"\n"}{error.message}</Text> ) 
    }
  }

  checkInput = event => {
    Keyboard.dismiss() /// dismiss keyboard 

    // catch all empty
    if (this.state.email.trim() === '' && this.state.password.trim() === '') { 
      this.setState(() => ({ emailError: "  ... Email required ... " }));
      this.setState(() => ({ passwordError: "  ... Password required ... " }));
      return;
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
    if (this.state.password.trim() === '') { 
      this.setState(() => ({ passwordError: "  ... Password required ... " }));
      return;
    } else {
      this.setState(() => ({ passwordError: null }));
      passwordOk = '1';
    }

    // form validation BEFORE onSubmit
    if (emailOk==='1') { console.log('o.log > email ok') }
    if (passwordOk==='1') { console.log('o.log > password ok') }
    if (emailOk==='1' && passwordOk==='1') { console.log('o.log > both ok'); this.onSubmit(event); }
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

    //event.preventDefault(); // is WEB specific ; replaced with checkInput for MOBILE
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
            <View style={Styles.formContainer}>
              <TextInput
                style={Styles.formInput}
                value={email}
                onChangeText={ (email) => this.setState( {email} ) }
                type="text"
                placeholder="Email Address"
                autoCapitalize = 'none'
                maxLength={40}
                />

                {!!this.state.emailError && (
                  <View><Text style={Styles.textRed}>{this.state.emailError}</Text></View>
                 )
                }

              <TextInput
                style={Styles.formInput}
                value={password}
                onChangeText={ (password) => this.setState( {password} ) }
                type="password"
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                placeholder="Password"
                maxLength={40}
              />

                {!!this.state.passwordError && (
                  <View><Text style={Styles.textRed}>{this.state.passwordError}</Text></View>
                 )
                }

              <TouchableOpacity style={Styles.formButton} onPress={ () => { this.checkInput() } } >
                <View><Text style={Styles.formButtonText}>{CONSTANTS.TEXT_LOGIN}</Text></View>
              </TouchableOpacity>

              <View><Link to={ROUTES.SIGNUP} underlayColor='#D3D3D3'><Text style={Styles.textCenter}>{"\n"}{CONSTANTS.UX_SIGNUP_MOBILE}</Text></Link></View>

              {!!this.state.error && (
                  <View style={Styles.textCenter}>{ this.checkError(this.state.error) }</View>
                )
              }

            </View>
    );
  }
}

const LoginForm = compose(
  withRouter,
  withFirebase,
)(LoginFormBase);

export default LoginPage
export { LoginForm }
