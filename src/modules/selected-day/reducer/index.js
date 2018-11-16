import createReducer from '../../../utils/createReducer';
import { SELECT_DAY } from '../actions';

export default createReducer(
  {
    anchorEl: null,
    selectedDateDay: null,
    eventData: null,
  },
  {
    [SELECT_DAY](state, { payload }) {
      return Object.assign({}, payload);
    },
  },
);
