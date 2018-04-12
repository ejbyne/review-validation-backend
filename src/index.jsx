import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { JssProvider, jss } from 'react-jss';

import store from './store';
import AppContainer from './components/AppContainer';

jss.setup({
  insertionPoint: document.getElementById('mui-styles')
});

ReactDOM.render(
  <ReduxProvider store={store}>
    <JssProvider jss={jss}>
      <AppContainer />
    </JssProvider>
  </ReduxProvider>,
  document.getElementById('app')
);
