import React from 'react';
import AppContainer from './Navigation/SwitchNavigation';
import BackendConnection from './BackendConnection';

export default function App() {

  //initialize the backend connection
  const connection = new BackendConnection()

  return (
    <AppContainer />
  );
  
}
