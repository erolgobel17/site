import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import GoogleAnalytics, { initGoogleAnalytics } from './components/GoogleAnalytics';
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './util/configure-store';

initGoogleAnalytics();

const store = configureStore();

const rootElement = document.getElementById('root');

const Ethvault = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
      <GoogleAnalytics/>
    </BrowserRouter>
  </Provider>
);

render(<Ethvault/>, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
