import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Route, Link } from "../App/router-native"; // new route mechanism

import { AuthUserContext } from '../../common/Session';
import LogoutLink from '../LogoutLink';

import Styles from '../../common/style';
import * as ROLES from '../../common/roles';
import * as ROUTES from '../../common/routes';
import * as CONSTANTS from '../../common/constants';

// og.fixme: believe ternary not working properly with Firebase JS SDK ?
const Navigation = () => (
  <AuthUserContext.Consumer>
    { authUser => authUser ? ( <NavigationNonAuth /> ) : ( <NavigationAuth authUser={authUser} />  ) }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
	<View style={Styles.navBar}>
	<View style={Styles.navLeft}><Link style={Styles.linkLanding} onPress={ ()=> { console.log('o.log > clicked landing') ; }}  to={ROUTES.LANDING} underlayColor='#D3D3D3'><Text>{CONSTANTS.TEXT_LANDING}</Text></Link></View>
	<View style={Styles.navRight}>
	<Link style={Styles.linkLogin} onPress={ ()=> { console.log('o.log > clicked login') ; }} to={ROUTES.LOGIN} underlayColor='#D3D3D3'><Text>{CONSTANTS.TEXT_LOGIN}</Text></Link>
	<Link style={Styles.linkAbout} onPress={ ()=> { console.log('o.log > clicked about') ; }} to={ROUTES.ABOUT} underlayColor='#D3D3D3'><Text>{CONSTANTS.TEXT_ABOUT}</Text></Link>
	</View>
	</View>
);			

const NavigationNonAuth = () => (
	<View style={Styles.navBar}>
	<View style={Styles.navLeft}><Link style={Styles.linkLanding} onPress={ ()=> { console.log('o.log > clicked landing') ; }}  to={ROUTES.LANDING} underlayColor='#D3D3D3'><Text>{CONSTANTS.TEXT_LANDING}</Text></Link></View>
	<View style={Styles.navRight}>
	<Link style={Styles.linkLogin} onPress={ ()=> { console.log('o.log > clicked login') ; }} to={ROUTES.LOGIN} underlayColor='#D3D3D3'><Text>{CONSTANTS.TEXT_LOGIN}</Text></Link>
	<Link style={Styles.linkAbout} onPress={ ()=> { console.log('o.log > clicked about') ; }} to={ROUTES.ABOUT} underlayColor='#D3D3D3'><Text>{CONSTANTS.TEXT_ABOUT}</Text></Link>
	</View>
	</View>
 );

export default Navigation;
