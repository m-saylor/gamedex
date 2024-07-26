import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { ClerkProvider } from '@clerk/clerk-react';
import { ActionTypes } from './actions';
import rootReducer from './reducers';

import App from './components/app';

// Import your publishable key
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Publishable Key');
}

// this creates the store with the reducers
const store = configureStore({
  reducer: rootReducer,
});

// creates react query client
const queryClient = new QueryClient();

// set state as authenticated if a token was previously saved + available
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER });
}

const root = createRoot(document.getElementById('main'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      {/* <ClerkProvider afterSignOutUrl="/" publishableKey={publishableKey}> */}
      <App />
      <ReactQueryDevtools />
      {/* </ClerkProvider> */}
    </Provider>
  </QueryClientProvider>,
);
