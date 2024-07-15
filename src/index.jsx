import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ActionTypes } from './actions';
import rootReducer from './reducers';

import App from './components/app';

// this creates the store with the reducers
const store = configureStore({
  reducer: rootReducer,
});

// set state as authenticated if a token was previously saved + available
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER });
}

const root = createRoot(document.getElementById('main'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
