import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {decode, encode} from 'base-64'
import Constants from 'expo-constants';
// redux stuff
import { Provider } from 'react-redux';
import rootReducer from './src/redux/reducers/index'
import {createStore} from 'redux'
import middleware from './src/redux/middleware/index';

import Home from './src/components/Home';
import Test from './src/test';

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }




const store = createStore(rootReducer , middleware);

export default function App() {
  return (
    <Provider store = {store}>
        <Home />
    </Provider>
    // <Test />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop : Constants.statusBarHeight,
    
  },
});
