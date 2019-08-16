import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

// withAuthentication = wrapper
// WithAuthentication = firebase
const withAuthenticationLs = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser)); 
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser'); 
          this.setState({ authUser: null });
        },
      );
    }

    // og.fixme = Warning: componentWillMount is deprecated and will be removed in the next major version. 
    // Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.
    componentWillUnmount() {
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

  return withFirebase(WithAuthentication);
};

export default withAuthenticationLs; 
