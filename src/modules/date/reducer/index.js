import { startOfMonth, addMonths } from 'date-fns/fp';
import {compose} from 'ramda';
import { NEXT_MONTH, PREV_MONTH, SET_DATE } from '../actions';
import createReducer from '../../../utils/createReducer';

export default createReducer(new Date().toISOString(), {
  [NEXT_MONTH](state) {
    return compose(
      addMonths(1),
      startOfMonth,
    )(state).toISOString();
  },
  [PREV_MONTH](state) {
    return compose(
      addMonths(-1),
      startOfMonth,
    )(state).toISOString();
  },
  [SET_DATE](state, { payload }) {
    return startOfMonth(payload);
  }
});
