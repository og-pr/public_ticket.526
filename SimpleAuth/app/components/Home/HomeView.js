import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../common/Session';

import LogoutLink from '../LogoutLink';
import * as CONSTANTS from '../../common/constants';

const HomePage = () => (
  <div className="container">
    <h2>{CONSTANTS.PAGE_HOME}</h2>
    <p>{CONSTANTS.TEXT_HOME_PAGE}</p>    
	<LogoutLink />   
  </div>
);

const condition = authUser => !!authUser;

export default HomePage
