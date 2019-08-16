import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Layout from '../Layout';
import Firebase, { FirebaseContext } from '../../common/Firebase';

export default () =>
	  <FirebaseContext.Provider value={new Firebase()}>
	    <Layout />
	  </FirebaseContext.Provider>
