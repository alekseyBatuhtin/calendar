import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';
import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const devConsole = console;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  store.subscribe(() => {
    devConsole.log('App state', store.getState());
  });

  sagaMiddleware.run(rootSaga);

  return { store };
}
