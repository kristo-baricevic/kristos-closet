import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import 'path-browserify';
// import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { createPopper } from '@popperjs/core';


const popcorn = document.querySelector('#popcorn');
const tooltip = document.querySelector('#tooltip');

const root = ReactDOM.createRoot(document.getElementById('root'));

createPopper(popcorn, tooltip, {
  placement: 'top',
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);