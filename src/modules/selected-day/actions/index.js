export const SELECT_DAY = 'SELECT_DAY';

export const selectDay = (anchorEl = null, selectedDateDay = null, eventData = null) => ({
  type: SELECT_DAY,
  payload: { anchorEl, selectedDateDay, eventData },
});
