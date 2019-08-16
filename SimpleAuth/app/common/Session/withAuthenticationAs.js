import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

import * as MOBILE from '../mobile.js'; // used to provide localStorage to RN
import AsyncStorage from '@react-native-community/async-storage'; // used to provide localStorage to RN

// withAuthentication = wrapper
// WithAuthentication = firebase
const withAuthenticationAs = Component => {
  class WithAuthen extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: MOBILE.lsGet('authUser'), 
      };
    }

    componentDidMount() {
      console.log('o.log > withAuthenticationAs - component DID mount')
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          MOBILE.lsStore('authUser', JSON.stringify(authUser)); 
          this.setState({ authUser });
        },
        () => {
          const keys = ['authUser'] 
          MOBILE.lsClear(keys); 
          this.setState({ authUser: null });
        },
      );
    }

    // og.fixme = Warning: componentWillMount is deprecated and will be removed in the next major version. 
    // Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.
    componentWillUnmount() {
      console.log('o.log > withAuthenticationAs - component WILL mount')
      this.listener(); 
      
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthen);
};

export default withAuthenticationAs;
