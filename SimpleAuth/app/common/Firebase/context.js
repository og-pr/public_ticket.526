// og.note: this is SAME for both web + mobile
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage'; 

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
