import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Root from './App';
import reducer from './src/reducers';

const combineReducer = combineReducers(reducer);

let store = createStore(combineReducer);

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

AppRegistry.registerComponent('RobotSimulator', () => App);
