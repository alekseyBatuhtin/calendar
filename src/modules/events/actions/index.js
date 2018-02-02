export const ADD_EVENT = 'ADD_EVENT';
export const GET_EVENTS = 'GET_EVENTS';
export const DELETE_EVENT = 'DELETE_EVENT';

export const addEvent = value => ({
  type: ADD_EVENT,
  payload: {
    value
  }
});

export const deleteEvent = date => ({
  type: DELETE_EVENT,
  payload: {
    date
  }
});

export const getEvents = () => ({
  type: GET_EVENTS
});
