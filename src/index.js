import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { AuthProvider } from 'react-oidc-context';
import authConfig from './lib/authConfig';

const customAuthConfig = {
  ...authConfig,
  onSigninCallback: (user) => {
    console.log('User signed in:', user?.state);
    const returnTo = user?.state?.returnTo || '/';
    window.history.replaceState({}, document.title, returnTo);
  },
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider {...customAuthConfig}>
      <App />
    </AuthProvider>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
