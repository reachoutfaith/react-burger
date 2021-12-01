import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { rootReducer } from './services/reducers/index';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);


ReactDOM.render(
  <React.StrictMode>

    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

