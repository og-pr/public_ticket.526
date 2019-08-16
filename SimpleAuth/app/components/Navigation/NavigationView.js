import React from 'react';
import { Link } from 'react-router-dom'; // needed by common/routes

import { AuthUserContext } from '../../common/Session';
import LogoutButton from '../Logout';

import * as ROUTES from '../../common/routes';
import * as ROLES from '../../common/roles';
import * as CONSTANTS from '../../common/constants';

// og.fixme: believe ternary not working properly with Firebase JS SDK ?
const Navigation = () => (
  <AuthUserContext.Consumer>
    { authUser => authUser ? ( <NavigationNonAuth /> ) : ( <NavigationAuth authUser={authUser} />  ) }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (

  <div className="topnav">
    <Link to={ROUTES.LANDING}>{CONSTANTS.TEXT_LANDING}</Link>
    <div className="topnav-right">
      <Link to={ROUTES.LOGIN}>{CONSTANTS.TEXT_LOGIN}</Link>
      <Link to={ROUTES.ABOUT}>{CONSTANTS.TEXT_ABOUT}</Link>
    </div>
  </div>

);

const NavigationNonAuth = () => (

  <div className="topnav">
    <Link to={ROUTES.LANDING}>{CONSTANTS.TEXT_LANDING}</Link>
    <div className="topnav-right">
      <Link to={ROUTES.LOGIN}>{CONSTANTS.TEXT_LOGIN}</Link>
      <Link to={ROUTES.ABOUT}>{CONSTANTS.TEXT_ABOUT}</Link>
    </div>
  </div>

);

export default Navigation;
