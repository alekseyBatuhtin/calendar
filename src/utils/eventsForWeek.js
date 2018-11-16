import { filter, map } from 'ramda';
import { isWithinInterval } from 'date-fns/fp';

const fiterByMonth = weeks => event => isWithinInterval({
  start: weeks[0][0],
  end: weeks[weeks.length - 1][weeks[0].length - 1],
})(event.date);

const formEventsByWeek = events => week => map(day => ({ [day]: events[day] || null }))(week);

const eventsForWeek = (events, weeks) => {
  const sortEventsByMonth = filter(fiterByMonth(weeks), events);
  const sortEventsByWeek = map(formEventsByWeek(sortEventsByMonth), weeks);
  return sortEventsByWeek;
};

export default eventsForWeek;
