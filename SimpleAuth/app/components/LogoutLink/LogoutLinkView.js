import React from 'react';
import { Link } from 'react-router-dom'; 
import { withFirebase } from '../../common/Firebase';

import * as ROUTES from '../../common/routes';
import * as CONSTANTS from '../../common/constants';

const LogoutButton = ({ firebase }) => {
	firebase.doUserCheck();
	return (
		<Link to={ROUTES.LOGOUT} onClick={ ()=> {firebase.doSignOut} }>{CONSTANTS.TEXT_LOGOUT}</Link>
	);

}

const condition = authUser => !!authUser;

export default withFirebase(LogoutButton);
