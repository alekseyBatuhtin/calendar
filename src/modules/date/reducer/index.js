import moment from 'moment';
import { NEXT_MONTH, PREV_MONTH, SET_DATE } from '../actions';
import createReducer from '../../../utils/createReducer';

export default createReducer(moment(new Date()).format(), {
  [NEXT_MONTH](state) {
    return moment(state)
      .startOf('month')
      .add(1, 'month')
      .format();
  },
  [PREV_MONTH](state) {
    return moment(state)
      .startOf('month')
      .subtract(1, 'month')
      .format();
  },
  [SET_DATE](state, { payload }) {
    return moment(payload)
      .startOf('month')
      .format();
  }
});
