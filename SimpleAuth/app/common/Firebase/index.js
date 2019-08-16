// og.note: this is SAME for both web + mobile
import AsyncStorage from '@react-native-community/async-storage'; // this is MOBILE specic ; localStorage for WEB is built in to all browsers

import FirebaseContext, { withFirebase } from './context';
import Firebase from './firebase';

export default Firebase;
export { FirebaseContext, withFirebase };
