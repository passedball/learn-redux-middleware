import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from "./serviceWorker";
import rootReducer, { rootSaga } from "./modules";
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';

// witth redux-logger and redux-thunk
const reduxLogger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(reduxLogger, ReduxThunk, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

/*
// witth redux-logger
const reduxLogger = createLogger(); 
const store = createStore(rootReducer, applyMiddleware(reduxLogger));
*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
