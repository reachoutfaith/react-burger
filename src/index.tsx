import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { rootReducer } from './services/reducers/index';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socket';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_GET_MESSAGE,
  WS_CONNECTION_SEND_MESSAGE
} from './services/constants/socket';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const wsActions = {
  WSStart: WS_CONNECTION_START,
  WSSend: WS_CONNECTION_SEND_MESSAGE,
  WSonOpen: WS_CONNECTION_SUCCESS,
  WSonClose: WS_CONNECTION_CLOSED,
  WSonError: WS_CONNECTION_ERROR,
  WSonMessage: WS_CONNECTION_GET_MESSAGE
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({} as any) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer);



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

