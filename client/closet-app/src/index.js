import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import 'path-browserify';


const root = ReactDOM.createRoot(document.getElementById('root'));


// Create a WebSocket connection
const socket = new WebSocket('wss://closet-app-backend.fly.dev');

// Attach event listeners to the socket (e.g., for handling messages)
socket.addEventListener('open', () => {
  console.log('WebSocket connection opened');
});

socket.addEventListener('message', (event) => {
  console.log('Received message:', event.data);
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

