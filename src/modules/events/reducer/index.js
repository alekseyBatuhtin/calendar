import createReducer from '../../../utils/createReducer';
import { GET_EVENTS, ADD_EVENT } from '../actions';

export default createReducer(
  {},
  {
    [`${GET_EVENTS}_SUCCESS`](state, { payload }) {
      return payload;
    },
    [`${ADD_EVENT}_SUCCESS`](state, { payload }) {
      state[payload.date] = payload;
      return Object.assign({}, state);
    }
  }
);
