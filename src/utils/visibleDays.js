import {
  startOfMonth,
  startOfISOWeek,
  endOfISOWeek,
  endOfMonth,
  differenceInCalendarDays,
  addDays,
} from 'date-fns/fp';
import { compose } from 'ramda';

const firstVisibleDay = date => compose(startOfISOWeek, startOfMonth)(date);

const lastVisibleDay = date => compose(endOfISOWeek, endOfMonth)(date);

const visibleDays = (date) => {
  const first = firstVisibleDay(date);
  const last = lastVisibleDay(date);
  const diffirence = differenceInCalendarDays(first)(last);
  const visibleDays = [];

  for (let i = 0; i <= diffirence; i++) {
    visibleDays.push(addDays(i)(first).toISOString());
  }
  return visibleDays;
};

export default visibleDays;
