import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';
import Routes from './routes';

function App() {
  // console.tron.log('Hello World Bora Codar');
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#24292e" />
      <Routes />
    </>
  );
}

export default App;
