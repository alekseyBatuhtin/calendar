import { fork } from 'redux-saga/effects';
import eventsSaga from './events/saga';

export const sagas = [eventsSaga];

export default function* rootSaga() {
  for (const saga of sagas) {
    yield fork(saga);
  }
}
