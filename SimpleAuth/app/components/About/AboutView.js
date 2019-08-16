import React from 'react';
import { compose } from 'recompose'; // og.note: replaced by React Hooks
import { withAuthorization, withEmailVerification } from '../../common/Session';

import * as CONSTANTS from '../../common/constants';

const AboutPage = () => (
  <div className="container">
    <h2>{CONSTANTS.PAGE_ABOUT}</h2>
  </div>
);

const condition = authUser => !!authUser;

export default AboutPage
