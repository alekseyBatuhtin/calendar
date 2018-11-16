import { put, call, takeEvery } from 'redux-saga/effects';

import { writeEvent, getEvents, deleteEvent } from '../../store';
import { ADD_EVENT, GET_EVENTS, DELETE_EVENT } from '../actions';

function* handleAddEvent(action) {
  const { type, payload } = action;

  yield put({ type: `${type}_START`, payload });
  const { event } = yield call(writeEvent, payload);
  yield put({
    type: `${type}_SUCCESS`,
    payload: event,
  });
}

function* handleGetEvents(action) {
  const { type } = action;
  yield put({ type: `${type}_START` });

  const events = yield call(getEvents);

  yield put({
    type: `${type}_SUCCESS`,
    payload: events,
  });
}

function* handleDeleteEvent(action) {
  const { type, payload } = action;
  yield put({ type: `${type}_START` });
  yield call(deleteEvent, payload.date);
  yield put({
    type: `${type}_SUCCESS`,
    payload: payload.date,
  });
}

export default [
  takeEvery(ADD_EVENT, handleAddEvent),
  takeEvery(GET_EVENTS, handleGetEvents),
  takeEvery(DELETE_EVENT, handleDeleteEvent),
];
