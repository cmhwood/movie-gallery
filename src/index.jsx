import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import store from './redux/store.js';
import App from './components/App/App.jsx';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </ChakraProvider>
);
