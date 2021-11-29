import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
<<<<<<< Updated upstream
=======
import { rootReducer } from './services/reducers/reducer';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
>>>>>>> Stashed changes



ReactDOM.render(
  <React.StrictMode>
<<<<<<< Updated upstream
    <App />
=======
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
>>>>>>> Stashed changes
  </React.StrictMode>,
  document.getElementById('root')
);

