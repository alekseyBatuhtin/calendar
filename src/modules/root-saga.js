import { fork } from 'redux-saga/effects';

export const sagas = [];

export default function* rootSaga() {
  for (const saga of sagas) {
    yield fork(saga);
  }
}
