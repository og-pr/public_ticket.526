import React from 'react';
import { compose } from 'recompose'; // og.note: replaced by React Hooks

import { withAuthorization, withEmailVerification } from '../../common/Session';
import * as CONSTANTS from '../../common/constants';

const LogoutPage = () => (
  <div className="container">
    <h2>{CONSTANTS.PAGE_LOGOUT}</h2>
  </div>
);

const condition = authUser => !!authUser;

export default LogoutPage
