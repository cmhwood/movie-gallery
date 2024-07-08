import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import store from './redux/store.js';
import App from './components/App/App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7fafc',
      // ...
      900: '#1a202c',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  // </ChakraProvider>
);
