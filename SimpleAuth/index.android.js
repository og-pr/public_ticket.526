// ...

// og.fixme = ReactStrap cannot be used for MOBILE
// ref https://stackoverflow.com/questions/48273507/how-do-i-use-the-reactstrap-components-with-a-react-native-app

//import 'bootstrap'; // this is js

// requires npm pkg css-loader ; add to package.json
// per https://github.com/webpack-contrib/css-loader

//import 'bootstrap/dist/css/bootstrap.min.css'; // ref = https://blog.logrocket.com/how-to-use-bootstrap-with-react-a354715d1121/
//import 'node_modules/bootstrap/dist/css/bootstrap.css'; // ref = https://blog.logrocket.com/how-to-use-bootstrap-with-react-a354715d1121/
//import '../node_modules/bootstrap/dist/css/bootstrap.css'; // ref = https://blog.logrocket.com/how-to-use-bootstrap-with-react-a354715d1121/

// ref = https://stackoverflow.com/questions/54176604/how-to-fix-bootstrap-error-when-i-run-webpack-dev-server
// ref = https://stackoverflow.com/questions/49538124/reactstrap-create-react-app-not-found-bootstrap-dist-css-bootstrap-css-v-4

// ...

import React from 'react';
import ReactDOM from 'react-dom';
import { AppRegistry } from 'react-native';

console.disableYellowBox = true; // disable warning regarding componentWillMount is deprecated and will be removed in the next major version

import App from './app/components/App'; // new = part of monorepo
AppRegistry.registerComponent('SimpleAuth', () => App);

console.log('o.log > index.android.js called')
