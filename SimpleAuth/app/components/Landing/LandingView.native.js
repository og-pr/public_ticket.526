import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Styles from '../../common/style';
import * as CONSTANTS from '../../common/constants';

const Landing = () => { 	
	return (
	<View style={Styles.header, Styles.textBlock}><Text style={Styles.text}>{CONSTANTS.PAGE_LANDING}</Text></View>
  );
}

const condition = authUser => !!authUser;

export default Landing;
