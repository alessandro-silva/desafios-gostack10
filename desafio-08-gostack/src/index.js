import 'react-native-gesture-handler';
import './config/ReactotronConfig';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import {
  StatusBar,
} from 'react-native';

import Routes from './routes';

function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar backgroundColor="#191920" />
        <Routes />
      </Provider>
    </>
  );
};



export default App;
