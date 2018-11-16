export const NEXT_MONTH = 'NEXT_MONTH';
export const PREV_MONTH = 'PREV_MONTH';
export const SET_DATE = 'SET_DATE';

export const nextMonth = () => ({
  type: NEXT_MONTH,
});

export const prevMonth = () => ({
  type: PREV_MONTH,
});

export const setDate = date => ({
  type: SET_DATE,
  payload: date,
});
