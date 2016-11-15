import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './containers/pages/index';
import ContainerStatsPage from './containers/pages/containerStats';
import NotFoundPage from './containers/pages/404';
import './index.css';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger'; // Logger
import reducer from './reducers';
import { getAllSwarmNodes, getAllContainers } from './actions';
import * as SocketIOActions from './actions/socketIO';
import thunk from 'redux-thunk'; // Allows us to write action creators that return a function instead of an action (async calls such as REST)
import io from 'socket.io-client';

// React router imports
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
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

ReactDOM.render(
  <Provider store={store}>
      { /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
          <Route path="/">
              <IndexRoute component={HomePage}/>
              <Route path="container/:containerId" component={ContainerStatsPage}/>
              <Route path="*" component={NotFoundPage}/>
          </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
);
