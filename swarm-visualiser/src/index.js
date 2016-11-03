import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './containers/pages/index';
import './index.css';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger'; // Logger
import reducer from './reducers';
import { getAllSwarmNodes, getAllContainers } from './actions';
import * as SocketIOActions from './actions/socketIO';
import thunk from 'redux-thunk'; // Allows us to write action creators that return a function instead of an action (async calls such as REST)
import io from 'socket.io-client';
import MainLayout from './containers/layouts/main';

// React router imports
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

// Configure middleware
const middleware = [ thunk ];

// Enable logger if not in production
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    combineReducers({
        ...reducer,
        routing: routerReducer
    }),
    applyMiddleware(...middleware)
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(getAllSwarmNodes());
store.dispatch(getAllContainers());

let socket = io('http://127.0.0.1:5001');
// let socket = io('http://10.48.98.232:5001');
socket.on('connect', () => {
    console.log('connected');
});

socket.on('data', (data) => {
    store.dispatch(SocketIOActions.receiveSocketData(data));
});

socket.on('disconnect', () => {
    console.log('disconnected');
});

ReactDOM.render(
  <Provider store={store}>
      { /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
          <Route path="/" component={HomePage}>
              <Route path="test" component={HomePage}/>
          </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
);
