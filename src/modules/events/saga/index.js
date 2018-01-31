import { put, call, takeEvery } from 'redux-saga/effects';

import { writeEvent, getEvents } from '../../store';
import { ADD_EVENT, GET_EVENTS } from '../actions';

function* handleAddEvent(action) {
  const { type, payload } = action;

  yield put({ type: `${type}_START`, payload });
  const { event } = yield call(writeEvent, payload);
  yield put({
    type: `${type}_SUCCESS`,
    payload: event
  });
}

function* handleGetEvents(action) {
  const { type } = action;
  yield put({ type: `${type}_START` });

  const events = yield call(getEvents);

  yield put({
    type: `${type}_SUCCESS`,
    payload: events
  });
}

export default function* watchEvent() {
  yield takeEvery(ADD_EVENT, handleAddEvent);
  yield takeEvery(GET_EVENTS, handleGetEvents);
}
