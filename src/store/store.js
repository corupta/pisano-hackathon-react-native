import { createStore, applyMiddleware, compose } from 'redux';
// import { createLogger } from 'redux-logger';
// import { composeWithDevTools } from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const addLoggingToDispatch = (store) => (next) => (action) => {
  let returnValue;
  const actionDesc = `${action.type} ${action.fetchType || ''}`;
  if (console.group) {
    console.group(actionDesc);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(actionDesc);
  } else {
    console.log('---');
    console.log('prev state', store.getState());
    console.log('action', action);
    returnValue = next(action);
    console.log('new state', store.getState());
    console.log('---');
  }
  return returnValue;
};

const middlewares = [sagaMiddleware];

window.remoteDebug = Boolean(navigator.platform);

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  process.env.NODE_ENV = 'development';
  middlewares.push(addLoggingToDispatch);
}

const composeEnhancers = compose;

/* if (window.remoteDebug) {
  // middlewares.push(addLoggingToDispatch);
  console.log('redux dev enabled');
  composeEnhancers = composeWithDevTools({ realtime: true });
} else {
  console.log('redux dev not enabled');
  composeEnhancers = compose;
} */

export const configureStore = (initialState) =>
  createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));

const store = configureStore();

sagaMiddleware.run(rootSaga);

export default store;
