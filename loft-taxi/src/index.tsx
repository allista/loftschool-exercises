import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import initStore from 'store';
import './index.scss';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = initStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div className="loft-taxi-main-page" />} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
