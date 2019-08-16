import React from 'react';
import { Router, Route, Link } from "../App/router-native"; // new route mechanism

import { StyleSheet, Text, View } from 'react-native';
import { withFirebase } from '../../common/Firebase';
import * as ROUTES from '../../common/routes';

import Styles from '../../common/style';
import * as CONSTANTS from '../../common/constants';

const LogoutLink = ({ firebase }) => {
	firebase.doUserCheck();
	return (
  		<Link style={Styles.linkLogout} to={ROUTES.LOGOUT} onPress={ ()=> {firebase.doSignOut} } underlayColor='#D3D3D3'><Text>{CONSTANTS.TEXT_LOGOUT}</Text></Link>
	);
}

const condition = authUser => !!authUser;

export default withFirebase(LogoutLink);
