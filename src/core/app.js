import ReactDOM from 'react-dom';
import React from 'react';

import { Provider } from 'react-redux';

import Calendar from '../components/calendar';
import configureStore from '../modules/configure-store';

import 'typeface-roboto';
import 'normalize.css';
import '../styles/main.css';

const { store } = configureStore();

const App = () => (
  <Provider store={store}>
    <Calendar />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
