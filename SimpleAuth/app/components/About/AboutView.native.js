import React from 'react';
import { compose } from 'recompose'; // og.note: replaced by React Hooks
import { StyleSheet, Text, View } from 'react-native';
import { withAuthorization, withEmailVerification } from '../../common/Session';

import Styles from '../../common/style';
import * as CONSTANTS from '../../common/constants';

const AboutPage = () => { 	
	return (
		<View style={Styles.header, Styles.textBlock}>
		<Text style={Styles.text}>{CONSTANTS.PAGE_ABOUT}</Text>
		</View>
  );
}

const condition = authUser => !!authUser;

export default AboutPage
