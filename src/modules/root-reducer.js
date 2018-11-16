import { combineReducers } from 'redux';
import events from './events/reducer';
import selectedDay from './selected-day/reducer';
import date from './date/reducer';

export default combineReducers({
  events,
  selectedDay,
  date,
});
