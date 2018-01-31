export const ADD_EVENT = 'ADD_EVENT';
export const GET_EVENTS = 'GET_EVENTS';

export const addEvent = value => ({
  type: ADD_EVENT,
  payload: {
    value
  }
});

export const getEvents = () => ({
  type: GET_EVENTS
});
