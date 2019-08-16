import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from '../../web/serviceWorker';

import Layout from '../Layout';
import Firebase, { FirebaseContext } from '../../common/Firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Layout />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

/// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
