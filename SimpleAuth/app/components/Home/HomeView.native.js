import React from 'react';
import { compose } from 'recompose';
import { StyleSheet, Text, View } from 'react-native';

import { withAuthorization, withEmailVerification } from '../../common/Session';

import LogoutLink from '../LogoutLink';
import Styles from '../../common/style';
import * as CONSTANTS from '../../common/constants';

const HomePage = () => {
	return (
	  	<View style={Styles.header, Styles.textBlock}><Text style={Styles.text}>{CONSTANTS.PAGE_HOME}</Text>
	  <View style={Styles.text}><Text>{CONSTANTS.TEXT_HOME_PAGE}</Text> 
	  <LogoutLink />   
	  </View>
	  </View>
  );
}

const condition = authUser => !!authUser;

export default HomePage
