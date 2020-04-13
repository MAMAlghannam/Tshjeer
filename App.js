import React from 'react';
import AppContainer from './Navigation/SwitchNavigation';
import BackendConnection from './BackendConnection';
import { I18nManager } from 'react-native';

//force LTR direction across the application
I18nManager.allowRTL(false)
I18nManager.forceRTL(false);

export default function App() {

  //initialize the backend connection
  const connection = new BackendConnection()

  return (
    <AppContainer />
  );
  
}
