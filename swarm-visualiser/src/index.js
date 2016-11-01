import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/index';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger'; // Logger
import reducer from './reducers';
import { getAllSwarmNodes, getAllContainers } from './actions';
import thunk from 'redux-thunk'; // Allows us to write action creators that return a function instead of an action (async calls such as REST)

const middleware = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

store.dispatch(getAllSwarmNodes());
store.dispatch(getAllContainers());

ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.getElementById('root')
);
