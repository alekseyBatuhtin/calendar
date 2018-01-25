import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
//import { stringify, parse } from 'qs';
//import { useRouterHistory } from 'react-router';
//import createBrowserHistory from 'history/lib/createBrowserHistory';

//import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import rootSaga from './root-saga';
import rootReducer from './root-reducer';

//const stringifyQuery = query => stringify(query, { arrayFormat: 'brackets', encode: false });
//const browserHistory = useRouterHistory(createBrowserHistory)({ parseQueryString: parse, stringifyQuery });

const sagaMiddleware = createSagaMiddleware();

const devConsole = console;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(/* routerMiddleware(browserHistory), */ sagaMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  //const history = syncHistoryWithStore(browserHistory, store);
  store.subscribe(() => {
    devConsole.log('App state', store.getState());
  });

  sagaMiddleware.run(rootSaga);

  return { store /* , history */ };
}
